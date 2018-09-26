import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';
import { startSetSnippets } from '../actions/snippet';
import SnippetItem from './SnippetItem'
class SnippetList extends Component {

  componentDidMount() {
    //this.props.setSnippets()
  }

  render () {
    if (this.props.snippets === undefined || this.props.isLoading) {return <p>Loading...</p>}
    return (
      <div className="container">
      <Link to="/add" className="btn btn-primary mb-md-2">Add New Snippet</Link>
     <div className="list-group ">


      {this.props.snippets && this.props.snippets.length === 0
          ? (<div className="list-group-item"><span>No Snippets</span></div>)
          : (this.props.snippets.length > 0 && this.props.snippets.map((snippet) => {
            return <SnippetItem key={snippet.id} snippet={snippet}/>}))
      }

      </div>
    </div>
    )}
}


const mapStateToProps = (state) => {
  return {
    snippets: state.snippets.snippets,
    isLoading: state.snippets.isLoading
  }};
const mapDispatchToProps = (dispatch) => ({
  setSnippets: ()=> dispatch(startSetSnippets()),
});


export default connect(mapStateToProps, mapDispatchToProps)(SnippetList);
