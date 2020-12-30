const express = require('express');

const app = express();

const dotenv = require('dotenv');

dotenv.config({path: '../../.env'});

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res){
	res.sendFile('index.js')
});

const envPORT = process.env.PORT;

app.listen(envPORT, function(){
	console.log(`listening on port: ${envPORT}`);
});