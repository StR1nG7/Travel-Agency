const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');
const filterData = require('./pseudoDB/filterdata.json');
const tours = require('./pseudoDB/tours.json');

const app = express();

app.use(express.json());
app.use(cors());

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

const root = {
	getTours: ({ page, size, currentFilters }) => {
		let resultTours;
		// if currentFilters isn't null/undefined AND isn't empty object start filter tours
		if (currentFilters && Object.keys(currentFilters).length !== 0) {
			const filterNames = Object.keys(currentFilters);

			const filteredTours = tours.filter((item) => {
				for (let i = 0; i < filterNames.length; i++) {
					const value = currentFilters[filterNames[i]];

					if (value !== 'All') { // if filter === 'All' do nothing and go to next iteration
						if (filterNames[i] !== 'price') {
							// for all filters beside filter Price
							if (Array.isArray(item[filterNames[i]])) {
								if (!item[filterNames[i]].includes(value)) {
									return false;
								}
								// eslint-disable-next-line eqeqeq
							} else if (item[filterNames[i]] != value) { // strings compares with numbers, not !==
								return false;
							}
						} else if (value < item.price) {
							// for filter Price
							return false;
						}
					}
				}

				return true;
			});

			resultTours = filteredTours;
		} else {
			resultTours = tours;
		}

		const skip = page * size - size;
		const portion = resultTours.slice(skip, skip + size);

		const data = {
			count: resultTours.length,
			tours: portion,
			minPrice,
			maxPrice,
		};
		return data;
	},
	getFilterData: () => filterData,
	getTour: ({ id }) => tours.find((item) => item.id === +id),
};

app.use('/graphql', graphqlHTTP({
	graphiql: true,
	schema,
	rootValue: root,
}));

app.get('/', (req, res) => {
	res.send('Home page');
});

app.listen(4000, () => {
	console.log('Server started');
});
