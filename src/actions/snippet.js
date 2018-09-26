import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers';

export const startAddSnippet = (snippet) => {
  let body = new FormData();

  Object.keys(snippet).forEach(key => body.append(key, snippet[key]));


  // {
  //   type: 'SUCCESS_ADD_SNIPPET',
  //     payload: () => {
  //   return {snippet}
  // }
  // },

  return {
      [RSAA]: {
        endpoint: '/snippets/',
        method: 'POST',
        body,
        headers: withAuth(),
        types: [
          'REQUEST_ADD_SNIPPET',
          'SUCCESS_ADD_SNIPPET',
          'FAILURE_ADD_SNIPPET'
        ]
      }

}};

export const startSetSnippets = () => {

  return {
    [RSAA]: {
      endpoint: '/snippets/',
      method: 'GET',
      headers: withAuth({'Content-Type': 'application/json'}),
      types: [
        'REQUEST_SET_SNIPPET', 'SUCCESS_SET_SNIPPET', 'FAILURE_SET_SNIPPET'
      ]

    }
  };

};

export const startDeleteSnippets = (snippet) => {
  const id = snippet.id;

  return {
    [RSAA]: {
      endpoint: `/snippets/${snippet.id}`,
      method: 'DELETE',
      headers: withAuth({'Content-Type': 'application/json'}),
      types: [
        'REQUEST_DELETE_SNIPPET',
        {
          type: 'SUCCESS_DELETE_SNIPPET', payload: () => {
            return {id};
          }
        },

        'FAILURE_DELETE_SNIPPET']

    }
  };

};

export const startEditSnippets = (id, updates) => {
  let body = new FormData();

  Object.keys(updates).forEach(key => body.append(key, updates[key]));

  return {
    [RSAA]: {
      endpoint: `/snippets/${id}/`,
      method: 'PUT',
      body,
      headers: withAuth(),
      types: [
        'REQUEST_EDIT_SNIPPET',
        {
          type: 'SUCCESS_EDIT_SNIPPET', payload: () => {
            return {
              id,
              updates
            };
          }
        },
        'FAILURE_EDIT_SNIPPET'
      ]

    }
  };

};
export const startGetOptions = () => {

  return {
    [RSAA]: {
      endpoint: `/snippets/`,
      method: 'OPTIONS',
      headers: withAuth({'Content-Type': 'application/json'}),
      types: [
        'REQUEST_GET_OPTIONS',
        'SUCCESS_GET_OPTIONS',
        'FAILURE_GET_OPTIONS'
      ]

    }
  };

};
