import _ from 'lodash';
import { CREATE_USER, FETCH_USERS, DELETE_USER } from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_USER:
            return  {...state, [action.payload.id]: action.payload} ;
        case FETCH_USERS:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case DELETE_USER:
            return _.omit(state, action.payload);
        default:
            return state;
    }
};