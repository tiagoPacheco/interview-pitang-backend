import express from 'express';
import routes from 'routes';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const DATABASE = process.env.MONGODB_DATABASE;;
const MONGODB_URI = process.env.MONGODB_URI;

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(bodyParser.json());
app.use('/', routes);

mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser: true
	})
	.then(result => {
		console.log('MongoDB connected');
	})
	.catch(error => {
		console.log(error);
	});

app.listen(PORT, function () {
	console.log('Running on port ' + PORT);
});