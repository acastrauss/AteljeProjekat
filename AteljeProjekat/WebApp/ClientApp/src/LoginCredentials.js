
import { createStore } from 'redux';

export const LOGIN_USER = 'LOGIN_USER';  
export const LOGOUT_USER = 'LOGOUT_USER';

export const initState = {
    type: LOGOUT_USER,
    userId: -1,
    userRole: -1,
    username: '',
    password: '',
    ime: '',
    prezime: '',
    email: ''
};

export function loginReducer(state = initState, action) {
    if (action.type == LOGIN_USER) {
        return {
            username: action.username,
            password: action.password,
            userId: action.userId,
            userRole: action.userRole,
            ime: action.ime,
            prezime: action.prezime,
            email: action.email
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

if (sessionStorage.getItem('user')) {
    let user = JSON.parse(sessionStorage.getItem('user'));
    user.type = LOGIN_USER;
    store.dispatch(user);
}