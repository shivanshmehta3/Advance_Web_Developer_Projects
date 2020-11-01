var express = require('express');

var PORT = 3000;

app = express();

app.use(express.static(__dirname + '/'));

app.get('/', function(req,res){
	res.sendFile('index.html');
});

app.listen(PORT, function(){
	console.log('Listening on port: ' + PORT);
});