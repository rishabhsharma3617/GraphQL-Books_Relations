const graphql = require('graphql')

const Book = require('../models/books')
const Authors = require('../models/authors')


const { 
        GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull
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
                return Authors.findById(parent.authorId)
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
                return Book.find({ authorId : parent.id})
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
                return Book.findById(args.id)
            }
        },
        books : {
            type : new GraphQLList(BookType),
            resolve(parent , args){
                return Book.find({})
            }
        },
        author : {
            type : AuthorType,
            args : {id : {type : GraphQLID}},
            resolve(parent,args){
                return author.findById(args.id)
            }
        },
        authors : {
            type : new GraphQLList(AuthorType),
            resolve(parent,args){
                return Authors.find({})
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
                name : { type : new GraphQLNonNull(GraphQLString) },
                age : { type : new GraphQLNonNull(GraphQLInt) }
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
                name : {type : new GraphQLNonNull(GraphQLString)},
                genre : {type : new GraphQLNonNull(GraphQLString)},
                authorId : { type : new GraphQLNonNull(GraphQLID) }
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
