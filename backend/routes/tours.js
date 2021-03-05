const { Router } = require('express');
const getTours = require('../controllers/tours.js');

const router = Router();

router.get('/', getTours);

module.exports = router;
