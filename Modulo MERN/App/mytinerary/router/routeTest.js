//Base modules
const express = require('express');
const router = express.Router();
//Model (if needed)
//const model = require('../models/schemaModel')

router.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;
