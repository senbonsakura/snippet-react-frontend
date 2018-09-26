import createHistory from 'history/createBrowserHistory';
import React, { Component } from 'react';
import Provider from 'react-redux/es/components/Provider';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { persistStore } from 'redux-persist';
import { startSetSnippets } from '../actions/snippet';
import App from '../App';
import AddSnippetPage from '../components/AddSnippetPage';
import EditSnippetPage from '../components/EditSnippetPage';
import NotFoundPage from '../components/NotFoundPage';
import Login from '../containers/Login';
import configureStore from '../store/store';
import PrivateRoute from './PrivateRoute';

const history = createHistory();
const store = configureStore(history);

class AppRouter extends Component {
  state = {
    rehydrated: false
  };

  componentDidMount () {

    persistStore(store, {}, () => {
      this.setState({rehydrated: true});
    });

  }

  render () {
    if (!this.state.rehydrated) {
      return <h1>Loading...</h1>;
    } else {
      store.dispatch(startSetSnippets());
    }

    return (

      <Provider store={store}>

        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/login/" component={Login}/>
            <PrivateRoute exact path="/" component={App}/>
            <PrivateRoute path="/snippet/:id" component={EditSnippetPage}/>
            <PrivateRoute path="/add" component={AddSnippetPage}/>
            <Route component={NotFoundPage}/>

          </Switch>
        </ConnectedRouter>

      </Provider>);
  }
}

export default AppRouter;
