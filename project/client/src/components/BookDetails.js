import React , {Component} from 'react';
 
import {graphql} from 'react-apollo' 
import {getBookQuery, getBooksQuery} from '../queries/queries'

class BookDetails extends Component{
    
    displayBookDetails(){
        const {book} = this.props.data 
        console.log(book)
        if(book){
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All Books by this author</p>
                    <ul className = "other-books">
                        {book.author.books.map(item => {
                            return <li key={item.id}>{item.name}</li>
                        })

                        }
                    </ul>
                </div>
            )
        }
        else
        {
            console.log(book)
            return (
                <div>No book selected</div>
            )
        }
    }
  render(){
      console.log(this.props)
    return (
    <div className="book-details">
        {this.displayBookDetails()}
    </div>
          )
      }
}

export default graphql(getBookQuery,{
    options : (props) => {
        return {
            variables : {
                id : props.bookid
            }
        }
    }
})(BookDetails)