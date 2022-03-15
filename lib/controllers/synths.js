const { Router } = require('express');
const Synth = require('../models/Synth');

module.exports = Router().post('/', async (req, res) => {
  const synth = await Synth.insert(req.body);

  res.send(synth);
});
