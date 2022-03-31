const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const app = express();

const graphQLOptions = {
    graphiql: true
}

app.use('/graphql', graphqlHTTP(graphQLOptions));

app.listen(4000, () => console.log('listening...'));