import express from 'express';
import validate from 'validate.js';
import estimator from '../../estimator';

const router = express.Router();

const STR_PATTERN = '[a-zA-Z ]+';
const STR_MESSAGE = '%{value} must be a valid string';

const inputDataRules = {
  'region.name': {
    presence: true,
    format: {
      pattern: STR_PATTERN,
      message: STR_MESSAGE
    }
  },
  'region.avgAge': {
    presence: true,
    numericality: {
      greaterThan: 1
    }
  },
  'region.avgDailyIncomePopulation': {
    presence: true,
    numericality: {
      lessThanOrEqualTo: 1,
      greaterThanOrEqualTo: 0
    }
  },
  'region.avgDailyIncomeInUSD': {
    presence: true,
    type: 'integer',
    numericality: {
      greaterThan: 0
    }
  },
  periodType: {
    presence: true,
    inclusion: ['days', 'weeks', 'months']
  },
  timeToElapse: {
    presence: true,
    numericality: {
      greaterThan: 1
    }
  },
  reportedCases: {
    presence: true,
    numericality: {
      greaterThan: 1
    }
  },
  population: {
    presence: true,
    numericality: {
      greaterThan: 1
    }
  },
  totalHospitalBeds: {
    presence: true,
    numericality: {
      greaterThan: 1
    }
  }
};

router.get('/', (req, res) => {
  res.send('Covid-19 Impact Estimator root');
});

router.get('/json', (req, res) => {
  // respond json
  const { data } = req.body;
  const error = validate(data, inputDataRules);
  if (error) {
    res.status(400).send({ error });
  }

  res.status(200).send(estimator(data));
});
router.get('/xml', (req, res) => {
  // respond xml
  res.send('get xml');
});
router.get('/logs', (req, res) => {
  // return log
  res.send('get logs');
});


export default router;
