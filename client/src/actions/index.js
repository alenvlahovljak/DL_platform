import users from '../userApi/users';
import { CREATE_USER } from './types';

export const createUser = formValues => async dispatch => {
    const response = await users.post('/users', formValues);

    dispatch({ type: CREATE_USER, payload: response });
};