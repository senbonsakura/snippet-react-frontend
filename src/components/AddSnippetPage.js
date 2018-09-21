import React, { Component } from 'react';
import SnippetForm from './SnippetForm';
import {connect} from 'react-redux';
import {startAddSnippet} from '../actions/snippet'
class AddSnippetPage extends Component {
  onSubmit = (snippet) => {
    this.props.startAddSnippet(snippet)
    this.props.history.push('/')
  }
  render () {
    return (
      <div className="container-fluid">
      <h3>New Snippet</h3>
        <SnippetForm
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddSnippet: (snippet) => dispatch(startAddSnippet(snippet))
})

export default connect(undefined, mapDispatchToProps)(AddSnippetPage);
