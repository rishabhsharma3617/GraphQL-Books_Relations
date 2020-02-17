const graphql = require('graphql')
const { GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt } = graphql

//dummy data

///////////////////////////////////////////////////////////////////////
var BookType = new GraphQLObjectType({
    name : 'Book',
    fields : () => ({
        id :  { type : GraphQLID },
        name : {type : GraphQLString},
        genre : { type : GraphQLString}
    })
})

///////////////////////////////////////////////////////////////////////
var AuthorType = new GraphQLObjectType({
    name : 'Author',
    fields : () => ({
        id :  { type : GraphQLID },
        name : {type : GraphQLString},
        age : { type : GraphQLInt}
    })
})

var RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    field : { //It contains the all types of queries
        book : {    
            type : BookType,
            args : {id : {type : GraphQLID}}, //this data type is just for the ease of graphql and in the backend its being used and manipulated as a string
            resolve(parent,args){
                //args.id is always available here
                // Code to get data from the db and other sources
            }
        },
        author : {
            type : AuthorType,
            args : {id : {type : GraphQLID}},
            resolve(parent,args){
                //Will use the mongoose code to do the value
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query  : RootQuery
})
