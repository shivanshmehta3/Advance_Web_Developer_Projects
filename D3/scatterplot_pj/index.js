var express = require('express');

var app = express();

var PORT = 3000;

const dotenv = require('dotenv');

dotenv.config({path: '../../.env'});

app.use(express.static(__dirname + '/'));
app.get('/', function(req, res){
	res.sendFile('index.html');
})

const envPORT = process.env.PORT;

app.listen(envPORT, function(){
	console.log(`listening on port: ${envPORT}`);
});