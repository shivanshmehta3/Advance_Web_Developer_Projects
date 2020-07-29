var express = require('express');
var bodyParser = require('body-parser');
var todosRoutes = require('./routes/todos');

app = express();

let PORT_NUMER = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/todos', todosRoutes);
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res){
	res.sendFile('index.html');
})

app.listen(PORT_NUMER, function(){
	console.log('listening on port: ' + PORT_NUMER);
});