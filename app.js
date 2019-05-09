const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());  

app.use(require('./controllers'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
	console.log(`Server running on ${PORT} port.`);
});