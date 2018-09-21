import React, { Component } from 'react';
import SnippetList from './components/SnippetList';




class App extends Component {

  render() {

    return (
      <div className="container-fluid">
        <h2>My Snippet List</h2>
          <SnippetList />
      </div>
    );
  }
}


export default App;
