import express from 'express';
import Validator from 'validatorjs';
import fs from 'fs';
import path from 'path';
import estimator from '../../estimator';

const js2xmlparser = require('js2xmlparser');
const { unflatten } = require('flat');

const router = express.Router();

const constraints = {
  region: {
    name: 'required|alpha_num',
    avgAge: 'required|min:1',
    avgDailyIncomeInUSD: 'required|min:1',
    avgDailyIncomePopulation: 'required|between:0,1'
  },
  periodType: ['required', { in: ['days', 'weeks', 'months'] }],
  timeToElapse: 'required|min:1',
  reportedCases: 'required|min:0',
  population: 'required|min:1',
  totalHospitalBeds: 'required|min:1'
};

const xmlOptions = {
  declaration: {
    include: false
  }
};

router.post(/^\/(json)?$/, (req, res) => {
  // respond json
  const data = req.body || {};
  const validation = new Validator(data, constraints);
  validation.setAttributeNames({
    'region.name': 'name',
    'region.avgAge': 'avgAge',
    'region.avgDailyIncomeInUSD': 'avgDailyIncomeInUSD',
    'region.avgDailyIncomePopulation': 'avgDailyIncomePopulation'
  });

  if (validation.fails()) {
    res.status(400).send(unflatten(validation.errors.all()));
    return;
  }

  res.status(200).send(estimator(data));
});
router.post('/xml', (req, res) => {
  // respond xml
  const data = req.body || {};
  const validation = new Validator(data, constraints);
  validation.setAttributeNames({
    'region.name': 'name',
    'region.avgAge': 'avgAge',
    'region.avgDailyIncomeInUSD': 'avgDailyIncomeInUSD',
    'region.avgDailyIncomePopulation': 'avgDailyIncomePopulation'
  });

  res.set('content-type', 'application/xml');
  if (validation.fails()) {
    res.status(400).send(js2xmlparser.parse('root', unflatten(validation.errors.all()), xmlOptions));
    return;
  }

  res.status(200).send(js2xmlparser.parse('root', estimator(data), xmlOptions));
});

router.post('/logs', (req, res) => {
  // return log
  res.set('content-type', 'text/plain');
  const logStream = fs.createReadStream(path.join(process.cwd(), '/src/requests.log'));

  logStream.on('open', () => {
    logStream.pipe(res);
  });
  logStream.on('error', (error) => {
    res.end(error);
  });
});


export default router;
