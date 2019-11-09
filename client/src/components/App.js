import React from 'react';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import Login from './pages/Login';

import UserLogin from './logins/UserLogin';
import AdminLogin from './logins/AdminLogin';

import UserList from './users/UserList';
import UpdateUser from './users/UpdateUser';
import DeleteUser from './users/DeleteUser';
import UserDetails from './users/UserDetails';

import CreateLecture from './lecturers/CreateLecture';
import DeleteLecture from './lecturers/DeleteLecture';
import LectureList from './lecturers/LectureList';
import UpdateLecture from './lecturers/UpdateLecture';

import CourseList from './courses/CourseList';
import CreateCourse from './courses/CreateCourse';
import DeleteCourse from './courses/DeleteCourse';
import UpdateCourse from './courses/UpdateCourse';

import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Header from './pages/Header';

const App = () => {
    return (
        <div className='ui container'>
           <Router history={history}>
           <div>
           <Header />
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/login" exact component={Login} />
                <Route path="/users/register" exact component={Register} />
            
                <Route path="/users/login" exact component={UserLogin} />
                <Route path="/admin/login" exact component={AdminLogin} />

                <Route path="/portal/users/list/:id" exact component={UserList} />
                <Route path="/portal/users/edit/:id" exact component={UpdateUser} />
                <Route path="/portal/users/delete/:id" exact component={DeleteUser} />
                <Route path="/portal/users/details/:id" exact component={UserDetails} />

                <Route path="/portal/courses/new" exact component={CreateCourse} />
                <Route path="/portal/courses/list/:id" exact component={CourseList} />
                <Route path="/portal/courses/edit/:id" exact component={UpdateCourse} />
                <Route path="/portal/courses/delete/:id" exact component={DeleteCourse} />

                <Route path="/portal/lecturers/new" component={CreateLecture} />
                <Route path="/portal/lecturers/list/:id" component={LectureList} />
                <Route path="/portal/lecturers/edit/:id" component={UpdateLecture} />
                <Route path="/portal/lecturers/delete/:id" component={DeleteLecture} />
            </Switch>
            </div>
            </Router>
        </div>  
    );
};

export default App;
