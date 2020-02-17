import React , {Component} from 'react'; 
import {graphql} from 'react-apollo' //it helps us to bind apoolo to react
import { getBooksQuery } from '../queries/queries'

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
//It is saying that bind the getbooksquery to the booklist component