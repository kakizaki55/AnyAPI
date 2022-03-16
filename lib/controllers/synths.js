const { Router } = require('express');
const Synth = require('../models/Synth');

module.exports = Router()
  .post('/', async (req, res) => {
    const synth = await Synth.insert(req.body);
    res.send(synth);
  })
  .get('/', async (req, res) => {
    const synths = await Synth.findAll();
    res.send(synths);
  })
  .get('/:id', async (req, res, next) => {
    try {
      const synth = await Synth.findById(req.params.id);
      res.send(synth);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })
  .patch('/:id', async (req, res) => {
    const synth = await Synth.updateById(req.params.id, req.body);
    res.send(synth);
  })
  .delete('/:id', async (req, res) => {
    const synth = await Synth.deleteById(req.params.id);
    res.send(synth);
  });
