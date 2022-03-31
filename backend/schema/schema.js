// schema contains all of the knowledge that tells graphQL how our app's data looks
const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = graphql;

const UserType = new GraphQLObjectType({
    // name of an individual record - REQUIRED
    name: 'User',
    // fields object tells graphql about all the properties a User has
    fields: {
        id: { type: GraphQLString },
        age: { type: GraphQLInt },
        firstName: { type: GraphQLString }
    }
});