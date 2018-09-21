import React, { Component } from 'react';
import {connect} from 'react-redux';
import { startDeleteSnippets, startEditSnippets } from '../actions/snippet';
import SnippetForm from './SnippetForm';

class EditSnippetPage extends Component {
  onDelete = () => {
    this.props.startDeleteSnippet({id: this.props.snippet.id});
    this.props.history.push('/');
  };
  onSubmit = (snippet) => {
    this.props.startEditSnippets(this.props.snippet.id, snippet);
    this.props.history.push('/');
  };

  render () {
    return (

      <div className="container-fluid">
          <SnippetForm snippet={this.props.snippet} onSubmit={this.onSubmit}/>
        <button className="btn btn-danger" onClick={this.onDelete}>Delete Snippet</button>
    </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {
  snippet: state
    .snippets.snippets
    .find((snippet) => parseInt(props.match.params.id,10) === snippet.id)

}};

const mapDispatchToProps = (dispatch) => ({
  startDeleteSnippet: (snippet) => dispatch(startDeleteSnippets(snippet)),
  startEditSnippets: (id, snippet) => dispatch(startEditSnippets(id, snippet)),
});


export default connect(mapStateToProps,mapDispatchToProps)(EditSnippetPage);
