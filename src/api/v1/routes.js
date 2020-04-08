import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Covid-19 Impact Estimator root');
});

router.get('/json', (req, res) => {
  // respond json
  res.send('get json');
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
