const graphql = require('graphql')

const Book = require('../models/books')
const Authors = require('../models/authors')


const { 
        GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList 
     } = graphql




var BookType = new GraphQLObjectType({
    name : 'Book',
    fields : () => ({
        id :  { type : GraphQLID },
        name : {type : GraphQLString},
        genre : { type : GraphQLString},
        author : {
            type : AuthorType,
            resolve(parent,args) {    // In graphql we always have the parent data if the relation is nested so its where the parent come into play
                                        //so we have the autgorid here as the book object is already fetched from the db              
                
            }
        }
    })
})


var AuthorType = new GraphQLObjectType({ 
    name : 'Author',
    fields : () => ({
        id :  { type : GraphQLID },//we are defining fields in function because it conatins the Othertype which is defined after its definition so its kind of a deadlock
        name : {type : GraphQLString},//so a function executes after the whole file is read so now the foreign and laterdefined
        age : { type : GraphQLInt},//Objecttypes are known now
        books : {
            type : new GraphQLList(BookType),
            resolve(parent,args){
                //will find the books from the collection of books
            }
        }
    })
})

var RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : { //It contains the all types of queries
        book : {    
            type : BookType,
            args : {id : {type : GraphQLID}}, //this data type is just for the ease of graphql and in the backend its being used and manipulated as a string
            resolve(parent,args){
                //args.id is always available here
                // Code to get data from the db and other sources
            }
        },
        books : {
            type : new GraphQLList(BookType),
            resolve(parent , args){
                //return the all boooks from the mongodb
            }
        },
        author : {
            type : AuthorType,
            args : {id : {type : GraphQLID}},
            resolve(parent,args){
                //Will use the mongoose code to do the value
            }
        },
        authors : {
            type : new GraphQLList(AuthorType),
            resolve(parent,args){
                //it will return the authors from the authors collection
            }
        }
    }
})

const Mutation =  new GraphQLObjectType({
    name : 'Mutation',
    fields : {
        addAuthor : {
            type : AuthorType,
            args : {
                name : { type : GraphQLString},
                age : { type : GraphQLInt}
            },
            resolve(parent, args){
                let author = new Authors({
                    name : args.name,
                    age : args.age
                })
               return  author.save()
            }
        },
        addBook : {
            type : BookType,
            args : {
                name : {type : GraphQLString},
                genre : {type : GraphQLString},
                authorId : { type : GraphQLID }
            },
            resolve(parent,args){
                let book = new Book({
                    name : args.name,
                    genre : args.genre,
                    authorId : args.authorId
                })
                
                return book.save()
            }
        }
    }

})


module.exports = new GraphQLSchema({
    query  : RootQuery,
    mutation : Mutation
})
