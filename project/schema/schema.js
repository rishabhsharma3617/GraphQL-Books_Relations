const graphql = require('graphql')
const { GraphQLObjectType,GraphQLString,GraphQLSchema } = graphql

const BookType = new GraphQLObjectType({
    name : 'Book',
    fields : () => ({
        id :  { type : GraphQLString },
        name : {type : GraphQLString},
        genre : { type : GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    field : {
        book : {
            type : BookType,
            args : {id : {type : GraphQLString}},
            resolve(parent,args){
                //args.id is always available here
                // Code to get data from the db and other sources
            }
        }
    }
})

module.exports = new GraphQLSchema()
