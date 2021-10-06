
import { createStore } from 'redux';

export const LOGIN_USER = 'LOGIN_USER';  
export const LOGOUT_USER = 'LOGOUT_USER';

export const initState = {
    type: LOGOUT_USER,
    username: '',
    userId: -1,
    userRole: -1
};

export function loginReducer(state = initState, action) {

    
    if (action.type == LOGIN_USER) {
        return {
            username: action.username,
            userId: action.userId,
            userRole: action.userRole
        };
    }

    else if (action.type == LOGOUT_USER) {
        return initState;
    }
    else {
        return state;
    }
}

export const store = createStore(loginReducer);

