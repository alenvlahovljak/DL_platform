import React from 'react';
import { Link } from 'react-router-dom';

const UserLogin = () => {
    return (
        <div>
            <Link to={'/portal/lecturers/list'} className="lecPath">Lecturers</Link>
                <p className="lecPar">Click on the lecturers logo in order to open lecturers list.</p>
            <Link to={'/portal/courses/list'} className="crsPath">Courses</Link>
                <p className="crsPar">Click on the courses logo in order to open courses list.</p>
        </div>
    );
};

export default UserLogin;