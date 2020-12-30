
var svgWidth = 600;
var svgHeight = 400;
var padding = 30;
var dataForAge15Plus = regionData.filter(d => d.medianAge >= 15)
var xScale = d3.scaleLinear()
	.domain(d3.extent(dataForAge15Plus, d => d.adultLiteracyRate))
	.range([padding, svgWidth - padding]);
var yScale = d3.scaleLinear()
	.domain(d3.extent(dataForAge15Plus, d => d.subscribersPer100))
	.range([svgHeight - padding, padding]);
var cRScale = d3.scaleLinear()
	.domain(d3.extent(dataForAge15Plus, d => d.extremePovertyRate))
	.range([5,15]);
var colorScale = d3.scaleLinear()
	.domain(d3.extent(dataForAge15Plus, d => d.growthRate))
	.range(['red', 'green']);

var updateSel = d3.select('svg')
	.attr('width', svgWidth)
	.attr('height', svgHeight)
	.selectAll('circle')
	.data(dataForAge15Plus, function(d){
		d.region;
	})
var xAxis = d3.axisBottom(xScale)
	.tickSize(-svgHeight + (padding * 2))
	.tickSizeOuter(0);
var yAxis = d3.axisLeft(yScale)
	.tickSize(-svgWidth + (padding * 2))
	.tickSizeOuter(0);

d3.select('svg')
	.append('g')
	.attr('transform', `translate(0,${svgHeight - padding})`)
	.call(xAxis);
d3.select('svg')
	.append('g')
	.attr('transform', `translate(${padding},0)`)
	.call(yAxis);
d3.select('svg')
	.append('text')
	.attr('x', svgWidth/2)
	.attr('y', svgHeight-5)
	.attr('text-anchor', 'middle')
	.text('Literacy Rate, Aged > 15');
d3.select('svg')
	.append('text')
	.attr('transform', 'rotate(-90)')
	.attr('x', -svgHeight/2)
	.attr('y', padding/2)
	.attr('text-anchor', 'middle')
	.text('Cellular Subscription');


updateSel.enter()
	.append('circle')
	.attr('cx', d => xScale(d.adultLiteracyRate))
	.attr('cy', d => yScale(d.subscribersPer100))
	.attr('r', d => cRScale(d.extremePovertyRate))
	.attr('fill', d => colorScale(d.growthRate))
	.attr('stroke', 'black')
	.attr('stroke-width', '1');