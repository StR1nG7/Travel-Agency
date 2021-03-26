const express = require('express');
const path = require('path');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');
const root = require('./resolvers');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/graphql', graphqlHTTP({
	graphiql: true,
	schema,
	rootValue: root,
}));

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, '../', 'client', 'dist')));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../', 'client', 'dist', 'index.html'));
	});
}

app.listen(4000, () => {
	console.log('Server started');
});
