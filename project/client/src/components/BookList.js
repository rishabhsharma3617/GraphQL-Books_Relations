import React , {Component} from 'react';
 
import {graphql} from 'react-apollo' //it helps us to bind apoolo to react
import { getBooksQuery } from '../queries/queries'
import BookDetail from '../components/BookDetails'


class BookList extends Component{
    constructor(props){
        super(props)
        this.state = {
            selected : null
        }
    }
    displayBooks() {
        var data = this.props.data
        if(data.loading){
            return (<div>Loading Books....</div>)
        }
        else{
            console.log(data)
            return data.books.map(book => {
                return (
                <li key={book.id} onClick={(e) => {this.setState({selected  : book.id})}}>{ book.name }</li>
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
        <BookDetail bookid={this.state.selected}/>
    </div>
          )
      }
}

export default graphql(getBooksQuery)(BookList);
//It is saying that bnd the getbooksquery to the booklist component