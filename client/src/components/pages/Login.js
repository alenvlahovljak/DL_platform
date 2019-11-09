import React from 'react';


class Login extends React.Component {
    render() {
        return (
            <div className="login-border">
            <div className="login-border2">
            <form className="login ui form">
             <input className="ui input focus"
                type="text"
                placeholder="Enter email"
             />
             <input className="ui input focus"
                type="text"
                placeholder="Enter password"
             />
             <button className="ui primary button">
                Sign in
             </button>
            </form>
            </div>
            </div>
        )
    }
}

export default Login;