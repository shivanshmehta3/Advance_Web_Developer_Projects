const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const todoRoutes = require('./routes');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const {errorHandler} = require('./handlers')

dotenv.config({path: '../../.env'});

const PORT = process.env.PORT_BACKEND;

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
	console.log(`listening on port: ${PORT}`)
})

app.use(errorHandler);