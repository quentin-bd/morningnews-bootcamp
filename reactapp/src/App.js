import React from 'react';
import './App.css';
import ScreenHome from './ScreenHome';
import ScreenArticlesBySource from './ScreenArticlesBySource';
import ScreenMyArticles from './ScreenMyArticles';
import ScreenSource from './ScreenSource';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import likedArticles from './reducers/article'
import userToken from './reducers/token'
import language from './reducers/language'
const store = createStore(combineReducers({likedArticles, userToken, language}));

function App() {
  const apiKey = '7566cf8e4acc48e1b969860c833796ec'

  return (
    <Provider store ={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={ScreenHome} />
          <Route path="/screen-articles-by-source/:id" component={ScreenArticlesBySource} />
          <Route path="/screen-my-articles" component={ScreenMyArticles} />
          <Route path="/screen-source" component={ScreenSource} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
