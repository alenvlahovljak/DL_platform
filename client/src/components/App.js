import React from 'react';
import RegisterForm from './RegisterForm'
import history from '../history';

const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
            <div>
                <Switch>
                <RegisterForm />
                </Switch>
            </div>  
            </Router>
        </div>
    );
};

export default App;
