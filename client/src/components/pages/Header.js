import React from 'react';
import { Link } from 'react-router-dom';
import homelogo from '../../homelogo.jpg';

const Header = () => {
    return(
            <div className="header ui secondary pointing menu">
                <Link to={'/'}>
                    <img src={homelogo} alt="Logo"/>
                </Link>
                <div className="homelogo">
                    <h3>Platform for progress </h3>
                </div>
                <div className="rightMenu right menu">
                    <Link to={'/users/register'} className="register">
                        <h3>Register </h3>
                    </Link>
                    <Link to={'/login'}>
                        <h3>Log in </h3>
                    </Link>
                </div>
            </div>
    );
}

export default Header;