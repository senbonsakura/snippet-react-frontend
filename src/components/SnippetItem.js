import React from 'react';
import { Link } from 'react-router-dom';

const SnippetItem = ({snippet}) => {
  return (
    <Link to={`/snippet/${snippet.id}`} className="list-group-item list-group-item-action">
      {snippet.title || "Untitled"}
    </Link>
  );
};

export default SnippetItem;
