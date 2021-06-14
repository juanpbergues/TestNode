const express = require('express')
const app = express()
const itemsController = require('./controllers/items')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configure Header HTTP
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'*'
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});


app.get('/', (request, response) => {
	response.send('Hola Mundo')
})

app.use('/api/items', itemsController)

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Servidor corriendo en el puerto ${PORT}`)
})
