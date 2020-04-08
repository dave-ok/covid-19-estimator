import express from 'express';

const router = express.Router();

router.get('/json', (req, res) => {
  // respond json
});
router.get('/xml', (req, res) => {
  // respond xml
});
router.get('/logs', (req, res) => {
  // return log
});


export default router;
