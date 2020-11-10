function countFrequencies(input){
	var result = [];
	
	input = input.split('').sort();

	for(var value of input){
		var charObj = result.find(obj => obj.character === value);
		if(charObj == undefined){
			result.push({
				count: 1,
				character: value,
			});
		}
		else{
			charObj.count += 1;
		}
	}
	return result;
}

d3.select('form')
	.on('submit', function(){
		d3.event.preventDefault();
		var inputSel = d3.select('input');
		var text = inputSel.property('value');
		inputSel.property('value', '');
		displayResult(text, true);
	})
d3.select('#reset')
	.on('click', function(){
		displayResult('', false);
	})
function displayResult(text, displayFlag){
	arr = countFrequencies(text);
	var svgHeight = 300;
	var svgWidth = 800;
	var barPadding = 10;
	var barWidth = (svgWidth / arr.length) - barPadding;
	
	var existingLetterSel = d3.select('#letters')
		.attr('height', svgHeight)
		.attr('width', svgWidth)
		.selectAll('.letter')
		.classed('new', false)
		.data(arr, function(d){
			return d.character;
		})
	//to handle display or reset
	if(!displayFlag)
	{
		countText = '';
		phraseText = '';
		arr = [];
	}
	else{
		var newChars = existingLetterSel.enter().nodes().length;
		var countText = `New Characters ${newChars}`;
		var phraseText = `Analysis of: ${text}`;
	}
	
	d3.select('#phrase').text(phraseText);
	d3.select('#count')
		.text(countText);
	
	existingLetterSel
		.exit()
		.remove()
	var enterSel = existingLetterSel
		.enter()
		.append('g')
			.classed('letter', true)
			.classed('new', true);
	enterSel.append('rect');
	enterSel.append('text');
	enterSel.merge(existingLetterSel)
			.select('rect')
			.attr('x', function(d, i){
				return i * (barWidth + barPadding);
			})
			.attr('y', function(d){
				return svgHeight - (d.count * 20);
			})
			.attr('width', barWidth)
			.attr('height', function(d){
				return d.count * 20;
			})
	enterSel.merge(existingLetterSel)
			.select('text')
			.attr('text-anchor', 'middle')
			.attr('x', function(d, i){
				return (i * (barWidth + barPadding)) + (barWidth/2);
			})
			.attr('y', function(d){
				return svgHeight - ((d.count * 20) + 5);
			})
			.text(function(d){
				return d.character;
			})

}
