const { buildSchema } = require('graphql');

const schema = buildSchema(`
	
	type Tour {
		id: ID,
    title: String,
    from: [String],
    destination: String,
    period: Int,
    persons: Int,
    hotels: [String],
    price: Int
	}
	type TourData {
		count: Int,
		tours: [Tour],
		minPrice: Int,
		maxPrice: Int
	}
	type Option {
		value: String,
		label: String
	}
	type FilterData {
		from: [Option],
		destination: [Option],
		period: [Option],
		persons: [Option],
		hotels: [Option]
	}
	input CurrentFilters {
		from: String,
    destination: String,
    period: String,
    persons: String,
    hotels: String,
    price: String
	}
	type Query {
		getTours(page: Int, size: Int, currentFilters: CurrentFilters): TourData,
		getFilterData: FilterData
	}
`);

module.exports = schema;
