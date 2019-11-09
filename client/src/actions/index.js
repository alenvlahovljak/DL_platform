import users from '../userApi/users';
import history from '../history';
import { CREATE_USER, FETCH_USERS, FETCH_USER, DELETE_USER } from './types';

export const createUser = formValues => async dispatch => {
    const response = await users.post('/users', formValues);

    dispatch({ type: CREATE_USER, payload: response.data });
    history.push('/');
};

export const fetchUsers = () => async dispatch => {
    const response = await users.get('/users');

    dispatch({ type: FETCH_USERS, payload: response.data })
};

export const fetchUser = id => async dispatch => {
    const response = await users.get(`/users/${id}`);

    dispatch({ type: FETCH_USER, payload: response.data})
};

export const deleteUser = id => async dispatch => {
    await users.delete(`/users/${id}`);

    dispatch({ type: DELETE_USER, payload: id})
    history.push('/portal/users/list/:id');
};