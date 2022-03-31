// schema contains all of the knowledge that tells graphQL how our app's data looks
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = require('graphql');
const _ = require('lodash');

//TODO: use a db eventually
const users = [
    { id: '123', age: 25, firstName: 'Lou' },
    { id: 'e42', age: 62, firstName: 'Anne' },
    { id: '12f', age: 35, firstName: 'Joe' }
]

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

// RootQuery tells graphql where to hook into our data - eg at user #23, then look from there
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // if you are looking for a user, and you give me an id, I will give you back a user of type UserType
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            // the resolve function actually goes and fetches the data
            // and resolves to a value
            resolve(parentVal, args) {
                // less efficient way
                // return users.filter(user => user.id === args.id);

                // more efficient way - stops when it finds the user instead of going through entire array
                return _.find(users, { id: args.id })
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: RootQuery });