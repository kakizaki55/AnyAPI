const { Router } = require('express');
const Synth = require('../models/Synth');

module.exports = Router().post('/', async (req, res) => {
  console.log('req', req.body);
  const synth = await Synth.insert(req.body);

  res.send(synth);
});
