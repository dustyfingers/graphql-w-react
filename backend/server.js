const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema/schema');

const app = express();

const graphQLOptions = {
    graphiql: true,
    schema
}

app.use('/graphql', graphqlHTTP(graphQLOptions));

app.listen(4000, () => console.log('listening...'));