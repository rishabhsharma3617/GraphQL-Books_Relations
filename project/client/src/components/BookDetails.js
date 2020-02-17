import React , {Component} from 'react';
 
import {graphql} from 'react-apollo' 
import {getBookQuery, getBooksQuery} from '../queries/queries'

class BookDetails extends Component{
   
  render(){
    return (
    <div className="book-details">
        <p> Output Detailsherres</p>
    </div>
          )
      }
}

export default graphql(getBookQuery)(BookDetails)