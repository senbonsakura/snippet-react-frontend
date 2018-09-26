import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth, * as fromAuth from './auth'
//import echo, * as fromEcho from './echo';
import snippets,  * as fromSnippets from './snippets';

export default combineReducers({
  auth:auth,
  router: routerReducer,

  snippets:snippets,
})


export const isAuthenticated = state => fromAuth.isAuthenticated(state.auth);
export const accessToken = state =>{
  console.log('withAuth',state);
  return fromAuth
.accessToken(state.auth) };


export const isAccessTokenExpired = state => fromAuth.isAccessTokenExpired(state.auth);
export const refreshToken = state => fromAuth.refreshToken(state.auth);
export const isRefreshTokenExpired = state => fromAuth.isRefreshTokenExpired(state.auth);
export const authErrors = state => fromAuth.errors(state.auth);
//export const serverMessage = state => fromEcho.serverMessage(state.echo)
export const getSnippets = state => fromSnippets.getSnippets(state.snippets);

export function withAuth(headers={}) {
  return (state) => ({
    ...headers,
    'Authorization': `Bearer ${accessToken(state)}`
  })
}
