import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// components
import {Main} from './components/main/main.jsx';
import {FunctionName} from './component-func-sample.jsx';
import {YourCalss} from './component-class-sample.jsx';

// context
import {MemberContext, defaultMember} from './context/member.jsx';
import {ThemeContext} from './context/theme.jsx';

function Index(props) {
  return (
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/class" exact>
          <YourCalss/>
        </Route>
        <Route path="/func" exact>
          <FunctionName />
        </Route>
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
