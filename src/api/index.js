import express from 'express';
import cors from 'cors';
import v1Router from './v1/routes';
import logger from './utils/requestLogger';

// create express app
const app = express();

// set up CORS
app.use(cors());
app.use(logger);


// include middleware to enable json body parsing and nested objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// base uri response
app.get('/', (req, res) => {
  res.status(200).send('We are alone together!');
});

// router for api version 1
app.use('/api/v1/on-covid-19', v1Router);

// routes not found go here
app.all('*', (req, res) => {
  res.status(404).send('Oops! Resource not found');
});

// default error handler
app.use((err, req, res) => {
  res.status(500).send('Houston we have a problem');
});

export default app;
