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
export {getBooksQuery,getAuthorsQuery}