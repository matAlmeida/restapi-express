var express = require('express'); 
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());  

app.use(require('./controllers'));

var PORT = 3000;
app.listen(PORT, function(){
	console.log(`Server running on ${PORT} port.`);
});