var input = d3.select('#new-text');
d3.select('.form_sec').on("submit", function(){
	d3.event.preventDefault();
	var inputVal = input.property('value');
	if(inputVal.length != 0){
		d3.select('#notes')
		.append('li')
		.classed('note', true)
		.text(inputVal);
		input.property('value', '');
	}
	showPreview(false);
});

input.on("input", function(){
	if(input.property('value').length != 0){
		showPreview(true);
	}
	else{
		showPreview(false);
	}
});
function showPreview(val)
{
	var viewSel = d3.select('#view')
	.classed('preview', val)
	.classed('hide-preview', !val)
	.style('animation', 'previewShow 2s')
	.text(input.property('value'));
	if(!val){
		viewSel.style('animation', null);
	}
}