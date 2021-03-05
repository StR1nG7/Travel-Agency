const filterData = require('../pseudoDB/filterdata.json');

const getFilterData = (req, res) => {
	res.send(filterData);
};

module.exports = getFilterData;
