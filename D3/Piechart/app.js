//define constants
const svgWidth = 600;
const svgHeight = svgWidth;
const padding = 10;
const paddingBottom = 35;
const paddingLeft = 30;
const barPadding = 1;
const orderedMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//set year range from data
[minYear, maxYear]  = d3.extent(birthData, d => d.year);

//display initial selected year
d3.select('#year_elem')
	.text(`Year: ${minYear}`);

//define global var for selected year
var selectedYear = minYear;

//define data based on selected year
var data = birthData.filter(d => d.year == selectedYear);

//find total births in a selected year
var totalBirths = data.reduce((a,b) => a + b.births,0);

//define quarter data based on selected year
var quarterData = getQuarterData(data);

//configure svg window
d3.select('#svg_elem')
	.attr('width', `${svgWidth}px`)
	.attr('height', `${svgHeight}px`)
	.append('g')
		.attr('transform', `translate(${svgWidth/2}, ${svgHeight/2})`)
		.classed('chart', true)
d3.select('#svg_elem')
	.append('g')
		.attr('transform', `translate(${svgWidth/2}, ${svgHeight/2})`)
		.classed('inner_chart', true);

//define colour scale for pie charts
var cScale = d3.scaleOrdinal()
	.domain(data, d => d.month)
	.range(d3.schemeCategory20);

var quarterColorScale = d3.scaleOrdinal()
	.domain(quarterData, d => d.quarter)
	.range(d3.schemeCategory10);

//define pie function
var pie = d3.pie()
	.value(d => d.births)
	.sort((a,b) => {
		if(orderedMonth.indexOf(a.month) > orderedMonth.indexOf(b.month)){
			return 1;
		}
		else{
			return -1;
		}
	})

//init arcs
var arcs = pie(data);

//init inner arcs
var innerArcs = pie(quarterData);

//define svg path function form arcs
var paths = d3.arc()
	.outerRadius(svgWidth/2 - 10)
	.innerRadius(svgWidth/4);

//define svg path function from inner arcs
var inner_paths = d3.arc()
	.outerRadius(svgWidth/4)
	.innerRadius(0);

//configure chart
var chartArc = d3.select('.chart').selectAll('.arc')
	.data(arcs)
	.enter()
	.append('path')
		.classed('arc', true);

//configure inner chart
var innerChartArc = d3.select('.inner_chart').selectAll('.inner_arc')
	.data(innerArcs)
	.enter()
	.append('path')
		.classed('inner_arc', true);

//update chart
updateChartArc(chartArc, innerChartArc)

//configure slider
var slider = d3.select('#slider');
slider.attr('min', minYear)
	.attr('max', maxYear)
	.property('value', minYear)
	.on('input', () => {
	//update chart
	selectedYear = slider.property('value');
	d3.select('#year_elem')
		.text(`Year: ${selectedYear}`);
	//update graph
	updateChart();
});

//add a tooltip in the svg div
var tooltip = d3.select('body')
	.append('div')
		.classed('tooltip', true);

//update chart function
function updateChart(){
	//define data based on selected year
	data = birthData.filter(d => d.year == selectedYear);
	
	//find total births in a selected year
	totalBirths = data.reduce((a,b) => a + b.births,0);
	
	//define quarter data based on selected year
	quarterData = getQuarterData(data);
	
	//define colour scale for pie chart
	cScale = d3.scaleOrdinal()
		.domain(data, d => d.month)
		.range(d3.schemeCategory20);
	
	 quarterColorScale = d3.scaleOrdinal()
	.domain(quarterData, d => d.quarter)
	.range(d3.schemeCategory10);

	//init arcs
	arcs = pie(data);
	
	//init inner arcs
 	innerArcs = pie(quarterData);

	//update selections
	chartArc = d3.select('.chart').selectAll('.arc')
		.data(arcs);
	
	//configure inner chart
 	innerChartArc = d3.select('.inner_chart').selectAll('.inner_arc')
	.data(innerArcs);
	
	//exit selections
	chartArc.exit()
		.remove();
	
	innerChartArc.exit()
		.remove();
	
	//enter selections
	enterSel1 = chartArc.enter()
		.append('path')
		.classed('arc', true);
	enterSel2 = innerChartArc.enter()
		.append('path')
		.classed('inner_arc', true);
	
	//merge selections ... append paths
	updateChartArc(enterSel1.merge(chartArc), enterSel2.merge(innerChartArc));
		
}

//function update chart arc
function updateChartArc(sel1, sel2){
	sel1.attr('d', paths)
		.attr('fill', d => cScale(d.data.month))
		.attr('stroke', 'black')
		.on('mousemove', (d) => {
			let percent = d.data.births/totalBirths*100;
			tooltip.style('opacity', 1)
				.style('left', d3.event.clientX + window.scrollX - tooltip.node().offsetWidth/2 + 'px')
				.style('top', d3.event.clientY + window.scrollY + 25 + 'px')
				.html(`
					<p>Month: ${d.data.month}</p>
					<p>Births: ${d.data.births.toLocaleString()}</p>
					<p>Percent: ${percent.toFixed(2)} %</p>
				`);
		})
		.on('mouseout', (d) => {
			tooltip.style('opacity', 0);
		})
	sel2.attr('d', inner_paths)
		.attr('fill', d => quarterColorScale(d.data.quarter))
		.attr('stroke', 'black')
		.on('mousemove', (d) => {
			let percent = d.data.births/totalBirths*100;
			tooltip.style('opacity', 1)
				.style('left', d3.event.clientX + window.scrollX - tooltip.node().offsetWidth/2 + 'px')
				.style('top', d3.event.clientY + window.scrollY + 25 + 'px')
				.html(`
					<p>Quarter: ${d.data.quarter + 1}</p>
					<p>Births: ${d.data.births.toLocaleString()}</p>
					<p>Percent: ${percent.toFixed(2)} %</p>
				`);
		})
		.on('mouseout', (d) => {
			tooltip.style('opacity', 0);
		})
}

//function get data based on quater
function getQuarterData(data){
	let quarterData = [0, 1, 2, 3].map(d => (
			{
				quarter: d,
				births: 0
			}
		));
	for(var i = 0; i < data.length; i++){
		var row = data[i];
		var quarter = Math.floor(orderedMonth.indexOf(row.month)/3)
		quarterData[quarter].births += row.births;
	}
	return quarterData;
}
