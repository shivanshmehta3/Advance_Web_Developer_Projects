d3.select('#page-title')
.style('background', '#000000')
.style('color', '#ffffff')

d3.selectAll('li')
.style('background', function (_, id){
	return id % 2 == 0 ? 'lightgrey' : 'white';
})

d3.select('.outer')
	.style('background', 'purple')
.select('div')
	.style('background', 'brown')
.select('div')
	.style('background', 'green')
