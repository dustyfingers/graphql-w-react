const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = require('graphql');
const axios = require('axios');

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

// RootQuery tells graphql where to hook into our data - eg at user #23, then
// look from there
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // if you are looking for a user, and you give me an id, I will give you
        // back a user of type UserType
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            // the resolve function fetches the data and resolves to a value
            resolve(parentVal, args) {
                return axios.get(`http://localhost:3000/users/${args.id}`).then(res => res.data);
            }
        }
    }
});

// schema contains all of the knowledge that tells graphQL how our app's data looks
module.exports = new GraphQLSchema({ query: RootQuery });