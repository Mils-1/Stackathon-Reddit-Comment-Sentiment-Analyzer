const totalScoreDomElem = document.getElementById('total-score');
const averageScoreDomElem = document.getElementById('average-score');
const { cloud } = d3.layout;

chrome.storage.local.get('summarizedData', data => {
  const { summarizedData } = data;
  console.log('summarizedData: ', summarizedData);
  const {
    totalScore,
    averageScore,
    d3NegativeTokenArr,
    d3PositiveTokenArr
  } = summarizedData;

  totalScoreDomElem.textContent = totalScore;
  averageScoreDomElem.textContent = averageScore;

  // ## d3 code ## //
  var layout = cloud()
    .size([800, 800])
    .words(d3PositiveTokenArr)
    .padding(5)
    .rotate(function() {
      return ~~(Math.random() * 6 - 2.5) * 30;
    })
    .font('Impact')
    .fontSize(function(d) {
      return d.size * 3;
    })
    .on('end', draw);

  layout.start();

  function draw(words) {
    console.log(`d3: `, d3);
    d3
      .select('body')
      .append('svg')
      .attr('width', layout.size()[0])
      .attr('height', layout.size()[1])
      .append('g')
      .attr(
        'transform',
        'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')'
      )
      .selectAll('text')
      .data(words)
      .enter()
      .append('text')
      .style('font-size', function(d) {
        return d.size + 'px';
      })
      .style('font-family', 'Impact')
      .style('fill', function(d) {
        return 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
      })
      .attr('text-anchor', 'middle')
      .attr('transform', function(d) {
        return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
      })
      .text(function(d) {
        return d.text;
      });
  }
});
