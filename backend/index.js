const express = require('express');
const tourRoutes = require('./routes/tours.js');
const filterDataRoutes = require('./routes/filterData.js');

const app = express();

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});
app.use(express.json());

// start API routes
app.use('/tours', tourRoutes);
app.use('/filterdata', filterDataRoutes);
// end API routes

app.get('/', (req, res) => {
	res.send('Home page');
});

app.listen(4000, () => {
	console.log('Server started');
});
