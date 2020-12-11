//define constants
const svgWidth = 600;
const svgHeight = 400;
const padding = 10;
const paddingBottom = 35;
const paddingLeft = 30;
const barPadding = 1;

//define data
var data = regionData.filter(d => d.subscribersPer100 != null && d.medianAge != null);

//display initial number of bins
[minBin, maxBin]  = [1,32];
d3.select('#bins_elem')
	.text(`Number of bins: ${minBin}`);

//define global var for bin numbers
var totalBins = minBin;

//configure svg window
var svgSelection = d3.select('#svg_elem')
	.attr('width', `${svgWidth}px`)
	.attr('height', `${svgHeight}px`);

//define x scale for histogram
var xScale = d3.scaleLinear()
	.domain(d3.extent(data, d => d.medianAge))
	.rangeRound([(padding + paddingLeft), (svgWidth - padding)]);

//define histogram function
var hGram = d3.histogram()
	.value(d => d.medianAge)
	.domain(xScale.domain())
	.thresholds(xScale.ticks(1))
//init hgram
var bins = hGram(data);



//configure data for y axis
var avgSubArray = bins.map((val) =>{
	let total = 0;
	val.forEach((val)=>{
		total += val.subscribersPer100;
	})
	return (total/val.length);
});

//define y scale for histogram
var yScale = d3.scaleLinear()
	.domain([0, d3.max(avgSubArray)])
	.range([svgHeight - padding -paddingBottom, padding]);

//configure axis
var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

//add axis
svgSelection.append('g')
	.attr('transform', `translate(0, ${svgHeight - 32})`)
	.call(xAxis);
svgSelection.append('g')
	.classed('y_axis', true)
 	.attr('transform', `translate(${32}, 0)`)
	.call(yAxis);

//add axis label
svgSelection.append('text')
	.text('Median Age')
	.attr('transform', `translate(${(svgWidth/2)+paddingLeft}, ${svgHeight - 5})`)
	.attr('text-anchor','middle');
svgSelection.append('text')
	.text('Subscribers per 100')
	.attr('transform', `translate(${10}, ${(svgHeight/2)-paddingBottom}) rotate(${-90})`)
	.attr('text-anchor','middle');

//configure bars
var bars = svgSelection.selectAll('.bar')
	.data(bins)
	.enter()
	.append('g')
		.classed('bar', true);

//append rectangles
bars.append('rect');

//update rectangle
updateRectangle(bars)

//append text
bars.append('text');

//update text
updateText(bars)

//configure slider
var slider = d3.select('#slider');
slider.attr('min', minBin)
	.attr('max', maxBin)
	.property('value', minBin)
	.on('input', () => {
	//update number of bins
	totalBins = slider.property('value');
	d3.select('#bins_elem')
		.text(`Number of bins: ${totalBins}`);
	//update graph
	updateGraph(totalBins);
});

//update graph function
function updateGraph(totalBins){
	//define histogram function
	hGram = d3.histogram()
		.value(d => d.medianAge)
		.domain(xScale.domain())
		.thresholds(xScale.ticks(totalBins))
	//init hgram
	bins = hGram(data);
	
	//configure data for y axis
	avgSubArray = bins.map((val) =>{
		let total = 0;
		val.forEach((val)=>{
			total += val.subscribersPer100;
		})
		return (total/val.length);
	});
	
	//define y scale for histogram
	yScale = d3.scaleLinear()
		.domain([0, d3.max(avgSubArray)])
		.range([svgHeight - padding - paddingBottom, padding]);
	
	//update selection
	bars = svgSelection.selectAll('.bar')
		.data(bins);
	
	//exit selection
	bars.exit()
		.remove()
	
	//enter selection
	enterSel = bars.enter()
		.append('g')
		.classed('bar', true);
	
	enterSel.append('rect');
	enterSel.append('text');
	
	//merge selection ... append rectangles
	updateRectangle(enterSel.merge(bars))
		
	//append text
	updateText(enterSel.merge(bars))
		
}

//function update rectange
function updateRectangle(sel){
	sel.select('rect')
		.attr('x', d => xScale(d.x0))
		.attr('y', d => {
			let total = 0;
			d.forEach((val)=>{
				total += val.subscribersPer100;
			})
			return yScale(total/d.length);
		})
		.attr('width', d => (xScale(d.x1) - xScale(d.x0)))
		.attr('height', d => {
			let total = 0;
			d.forEach((val)=>{
				total += val.subscribersPer100;
			})
			return svgHeight - paddingBottom - yScale(total/d.length);
		})
		.attr('fill', '#ffc800')
}

//function update text
function updateText(sel){
	sel.select('text')
		.text(d => d.x0 + ' - ' + d.x1 + ' Years')
		.attr('y', d => (xScale(d.x1) + xScale(d.x0))/2)
		.attr('x', -svgHeight + (paddingBottom+5))
		.attr('transform', 'rotate(-90)')
		.style('dominant-baseline', 'middle')
}
