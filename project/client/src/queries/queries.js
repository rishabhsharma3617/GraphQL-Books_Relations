import {gql} from 'apollo-boost' //react does not understand the graphql query language so this package helps us to parse queries and make it react understandale

const getAuthorsQuery = gql`
   {
       authors{
           name
           id
       }
   }
`

const getBooksQuery = gql`
   {
       books{
           name
           id
       }
   }
`
const addBookMutation = gql`
   mutation($name:String!,$genre:String!,$authorId:ID!){
    addBook(name : $name,genre : $genre,authorId : $authorId){
        name
        id
    }
   }
`

const getBookQuery = gql`
query($id : String){
    book(id:ID){
        id
        name
        author{
            id
            name
            age
            bboks{
                name 
                id
            }
        }
    }
}
`
export {getBooksQuery,getAuthorsQuery,addBookMutation,getBookQuery}