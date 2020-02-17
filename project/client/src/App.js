import React,{Component} from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo' //it made the react interact with the apollo which helps to inject the data fetched into our react app
//components
import BookList from './components/BookList'
import AddBook from './components/AddBook'


const client = new ApolloClient({
  uri : 'http://localhost:4000/graphql'   //where server is hosted, it is the endpoint whic is gonna give us the data
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        
      <div id="main">
        <h1>Rishabh's reading list</h1>
        <BookList />
        <AddBook />
      </div>

      </ApolloProvider>
    );
  }

}

export default App;
