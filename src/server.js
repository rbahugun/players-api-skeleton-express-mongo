// TODO
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.json');
const mongoose = require('mongoose');
const routes = require('./routes');

// Setup db
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri,  { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, 'mongo connection error:'));

const app = module.exports = express();
app.use(bodyParser.json());

var router = express.Router();
app.use('/', routes);

app.use('/admin',(req, res, next) => {
	console.log('Go to admin');
	next(err);
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(config.port);
  console.log('Express started on port ' + config.port);
}

// error handler
app.use((err, req, res, next) => {
	res.status(err.status || 409);
	res.send(err.message);
});








