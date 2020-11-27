import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// components
import {Main} from './components/main/main.jsx';


function Index(props) {
  return (
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/">
          <Main/>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>
  )
}

ReactDOM.render(
  <Index/>,
  document.getElementById('react-root')
);
