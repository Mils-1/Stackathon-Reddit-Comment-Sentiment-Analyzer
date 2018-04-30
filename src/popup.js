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
  const d3fontSize = 8;
  console.log(`d3PositiveTokenArr: `, d3PositiveTokenArr);

  totalScoreDomElem.textContent = totalScore;
  averageScoreDomElem.textContent = averageScore;

  // ## d3 code ## //
  const layout = cloud()
    .size([800, 600])
    .words(d3PositiveTokenArr)
    .padding(3)
    .rotate(function() {
      //(Math.random() * 2) * 60
      //return ~~(Math.random() * 6 - 2.5) * 30;
      return 0;
    })
    .font('Impact')
    .fontSize(function(d) {
      return d.size * d3fontSize;
    })
    .on('end', draw);

  layout.start();

  function draw(words) {
    console.log(`d3: `, d3);
    d3
      .select('#positive-token-cloud')
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

  const layout1 = cloud()
    .size([800, 600])
    .words(d3NegativeTokenArr)
    .padding(3)
    .rotate(function() {
      return 0;
      //return ~~(Math.random() * 6 - 2.5) * 30;
    })
    .font('Impact')
    .fontSize(function(d) {
      return d.size * d3fontSize;
    })
    .on('end', draw1);

  layout1.start();

  function draw1(words) {
    console.log(`d3: `, d3);
    d3
      .select('#negative-token-cloud')
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


  $('#positive-token-table').tabulator({
    initialSort: [
      {column: 'size', dir: 'desc'}
    ],
    height: 500, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    layout: 'fitColumns', //fit columns to width of table (optional)
    columns: [
      //Define Table Columns
      { title: 'Word', field: 'text', align: 'center', width: 400, sorter: 'string' },
      { title: 'Quantity', field: 'size', align: 'center', sorter: 'number' }
    ],
  });

  let adjustedPositiveTokens = d3PositiveTokenArr.map(obj => {
    obj.size = obj.size / d3fontSize;
    return obj;
  })

  $('#positive-token-table').tabulator('setData', adjustedPositiveTokens);

  $('#negative-token-table').tabulator({
    initialSort: [
      {column: 'size', dir: 'desc'}
    ],
    height: 500, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    layout: 'fitColumns', //fit columns to width of table (optional)
    columns: [
      //Define Table Columns
      { title: 'Word', field: 'text', align: 'center', width: 400, sorter: 'string' },
      { title: 'Quantity', field: 'size', align: 'center', sorter: 'number' }
    ],
  });

  let adjustedNegativeTokens = d3NegativeTokenArr.map(obj => {
    obj.size = obj.size / d3fontSize;
    return obj;
  })

  $('#negative-token-table').tabulator('setData', adjustedNegativeTokens);
});
