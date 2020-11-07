var express = require('express');

app = express();

var PORT = 3000;

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res){
	res.sendFile('index.html');
})

app.listen(PORT, function(){
	console.log(`listening on port: ${PORT}`);
})