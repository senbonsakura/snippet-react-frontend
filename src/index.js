import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import {Route, Switch} from 'react-router'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import AddSnippetPage from './components/AddSnippetPage';
import registerServiceWorker from './registerServiceWorker';
import Login from './containers/Login';
import PrivateRoute from './containers/PrivateRoute';
import configureStore from './store/store'
import EditSnippetPage from './components/EditSnippetPage'
const history = createHistory();
const store = configureStore(history);

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/login/" component={Login} />

        <PrivateRoute path="/snippet/:id" component={EditSnippetPage}/>
        <PrivateRoute path="/add" component={AddSnippetPage}/>
        <PrivateRoute path="/" component={App}/>
      </Switch>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
