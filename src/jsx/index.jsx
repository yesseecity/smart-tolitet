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
    <Router>
        <MemberContext.Provider value={defaultMember}>
        <ThemeContext.Provider value="dark">
            <Switch>
                <Route path="/class" exact>
                    <YourCalss/>
                </Route>
                <Route path="/class/consumer" exact>
                    <MemberContext.Consumer>
                        {
                            (member) => {
                                return <ThemeContext.Consumer>
                                    {
                                        (theme)=>{
                                            return <YourCalss member={member} theme={theme} win={'3.1'}/>
                                        }
                                    }
                                </ThemeContext.Consumer>
                            }
                        }
                    </MemberContext.Consumer>
                </Route>
                <Route path="/func" exact>
                    <FunctionName />
                </Route>
                <Route path="/">
                    <div className="wrapper main">
                        <Main/>
                    </div>
                </Route>
            </Switch>
        </ThemeContext.Provider>
        </MemberContext.Provider>
    </Router>
    )
}

ReactDOM.render(
    <Index/>,
    document.getElementById('react-root')
);
