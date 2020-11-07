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
	
	var existingLetterSel = d3.select('#letters')
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
	
	existingLetterSel
		.enter()
		.append('div')
			.classed('letter', true)
			.classed('new', true)
			.style('width', '20px')
			.style('margin-right', '5px')
			.style('line-height', '20px')
			.text(function(d){
				return d.character;
			})
		.merge(existingLetterSel)
			.style('height', function(d){
				return d.count * 20 + 'px';
			})

}
