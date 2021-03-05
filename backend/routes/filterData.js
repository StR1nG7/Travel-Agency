const { Router } = require('express');
const getFilterData = require('../controllers/filterData.js');

const router = Router();

router.get('/', getFilterData);

module.exports = router;
