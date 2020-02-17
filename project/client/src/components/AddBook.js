import React , {Component} from 'react';
import {gql} from 'apollo-boost'  //react does not understand the graphql query language so this package helps us to parse queries and make it react understandale 
import {graphql} from 'react-apollo' //it helps us to bind apoolo to react

const getAuthorsQuery = gql`
   {
       authors{
           name
           id
       }
   }
`


class AddBook extends Component{
   displayAuthors() {
       var data = this.props.data
       if(data.loading){
           return (<option>Loading Authors...</option>)
       } else {
           return data.authors.map(author => {
           return (<option key={author.id} value={author.id}>{author.name}</option>)
           })
       }
   }
  render()
  {
    return (
        <div>
             <form id="add-book">
            <div className="field">
                <label>Book Name :</label>
                <input type="text" />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text"/>
            </div>
            
            <div className="field">
                <label>Author:</label>
                <select>
                    <option>Select Author</option>
                    { this.displayAuthors()}
                </select>
            </div>
            <button>+</button>
        </form>
        </div>
    )
          
      }
}

export default graphql(getAuthorsQuery)(AddBook);