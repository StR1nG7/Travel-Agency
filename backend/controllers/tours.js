const fs = require('fs');

const tours = JSON.parse(fs.readFileSync('pseudoDB/tours.json'));

// start set minPrice and maxPrice
let maxPrice = 0;
let minPrice = 0;

tours.forEach((item, index) => {
	if (item.price > maxPrice) {
		maxPrice = item.price;
	}
	if (index === 0) {
		minPrice = item.price;
	} else if (item.price < minPrice) {
		minPrice = item.price;
	}
});
// end set minPrice and maxPrice

function getFilteredTours(filters) {
	const filterNames = Object.keys(filters);

	const filteredTours = tours.filter((item) => {
		for (let i = 0; i < filterNames.length; i++) {
			const value = filters[filterNames[i]];

			if (value !== 'All') { // if filter === 'All' do nothing and go to next iteration
				if (filterNames[i] !== 'price') {
					// проверки для всех других фильтров
					if (Array.isArray(item[filterNames[i]])) {
						if (!item[filterNames[i]].includes(value)) {
							return false;
						}
						// eslint-disable-next-line eqeqeq
					} else if (item[filterNames[i]] != value) { // strings compares with numbers, not !==
						return false;
					}
				} else if (value < item.price) {
					return false;
				}
			}
		}

		return true;
	});

	return filteredTours;
}

const getTours = (req, res) => {
	const queryParams = req.query.data && JSON.parse(req.query.data);

	let resultTours;
	// if queryParams.currentFilters not empty object start filter tours
	if (queryParams.currentFilters && Object.keys(queryParams.currentFilters).length !== 0) {
		resultTours = getFilteredTours(queryParams.currentFilters);
	} else {
		resultTours = tours;
	}

	const currentPage = +queryParams.page;
	const size = +queryParams.size;
	const skip = currentPage * size - size;
	const portion = resultTours.slice(skip, skip + size);

	const data = {
		count: resultTours.length,
		tours: portion,
		minPrice,
		maxPrice,
	};

	res.send(JSON.stringify(data));
};

module.exports = getTours;
