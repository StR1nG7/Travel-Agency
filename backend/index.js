const express = require('express');
const fs = require('fs');

const app = express();

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Home page');
});

app.post('/tours', (req, res) => {
	let tours = JSON.parse(fs.readFileSync('pseudoDB/tours.json'));
	const currentPage = req.body.page;
	const size = req.body.size;
	let maxPrice = 0;
	let minPrice = 0;

	// start set minPrice and maxPrice
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

	// start filter tours
	if (req.body.currentFilters) {
		const filters = req.body.currentFilters;
		const filterNames = Object.keys(filters);

		tours = tours.filter((item) => {
			for (let i = 0; i < filterNames.length; i++) {
				const value = filters[filterNames[i]];
				if (value !== 'All') { // if filter = 'All' continue to next iteration
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
						// проверки для фильтра Цена (вернуть все туры, которые <= указанной цены)
						return false;
					}
				}
			}

			return true;
		});
	}
	// end filter tours

	const skip = currentPage * size - size;
	const portion = tours.slice(skip, skip + size);
	const data = {
		count: tours.length,
		tours: portion,
		minPrice,
		maxPrice,
	};

	res.send(JSON.stringify(data));
});

app.get('/filterdata', (req, res) => {
	const filterData = JSON.parse(fs.readFileSync('pseudoDB/filterdata.json'));
	res.send(filterData);
});

app.listen(4000, () => {
	console.log('Server started');
});
