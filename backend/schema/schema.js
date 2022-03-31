const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
} = require('graphql');
const axios = require('axios');

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    // because of the way closures work in js, this works. the field object is no longer in this scope: it is in the arrow functions scope
    // which doesnt get executed until everything in this file is defined correctly
    // HAS TO BE EXACTLY LIKE THIS TO NOT GET A CIRCULAR REFERENCE ERROR fields: () => ({ id: blah blah blah })
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentVal, args) {
                return axios.get(`http://localhost:3000/users`).then(res => res.data.filter(user => user.companyId === parentVal.id))
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    // name of an individual record - REQUIRED
    name: 'User',
    // fields object tells graphql about all the properties a User has
    fields: () => ({
        id: { type: GraphQLString },
        age: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        company: {
            type: CompanyType,
            resolve(parentVal, args) {
                // parentVal is the User that has been retrieved in this case
                return axios.get(`http://localhost:3000/companies/${parentVal.companyId}`).then(res => res.data);
            }
        }
    })
});

// RootQuery tells graphql where to hook into the graph representation of our data - eg at user 123, or company 2
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
        },

        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve(parentVal, args) {
                return axios.get(`http://localhost:3000/companies/${args.id}`).then(res => res.data);
            }
        }
    }
});

// schema contains all of the knowledge that tells graphQL how our app's data looks
module.exports = new GraphQLSchema({ query: RootQuery });