import React , {Component} from 'react';
import {gql} from 'apollo-boost'  //react does not understand the graphql query language so this package helps us to parse queries and make it react understandale 
import {graphql} from 'react-apollo' //it helps us to bind apoolo to react

const getBooksQuery = gql`
   {
       books{
           name
           id
       }
   }
`
class BookList extends Component{
    displayBooks() {
        var data = this.props.data
        if(data.loading){
            return (<div>Loading Books....</div>)
        }
        else{
            return data.books.map(book => {
                return (
                <li key={book.id}>{ book.name }</li>
                )
            })
        }
    }
  render(){
    return (
    <div className="App">
        <ul id="book-list">
        {this.displayBooks()}
        </ul>
    </div>
          )
      }
}

export default graphql(getBooksQuery)(BookList);
//It is saying that bnd the getbooksquery to the booklist component