import { createStore } from 'redux';

// entities of app
export const ADD_ATELJE = 'ADD_ATELJE';
export const NO_ATELJE = 'NO_ATELJE';
export const ADD_AUTOR = 'ADD_AUTOR';
export const NO_AUTOR = 'NO_AUTOR'
export const ADD_UMETNICKO_DELO = 'ADD_UMETNICKO_DELO';
export const NO_UMETNICKO_DELO = 'NO_UMETNICKO_DELO';

export const initAteljes = [];
export const initAutors = [];
export const initUmetnickoDelo = [];

export const initAteljeState = {
    type: NO_ATELJE,
    ateljes: initAteljes
};

export const initAutorState = {
    type: NO_AUTOR,
    autors: initAutors
};

export const initUDState = {
    type: NO_UMETNICKO_DELO,
    uds: initUmetnickoDelo
};

export function ateljeReducer(state = initAteljeState, action){
    if (action.type == ADD_ATELJE) {
        return {
            ateljes: action.ateljes
        };
    }
    else {
        return state;
    }
};

export function autorReducer(state = initAutorState, action) {
    if (action.type == ADD_AUTOR) {
        
        return {
            autors: action.autors
        };
    }
    else {
        return state;
    }
};

export function udReducer(state = initUDState, action) {
    if (action.type == ADD_UMETNICKO_DELO) {
        
        return {
            uds: action.uds
        };
    }
    else {
        return state;
    }
};

export const storeAtelje = createStore(ateljeReducer);
export const storeAutor = createStore(autorReducer);
export const storeUd = createStore(udReducer);

// active entities
export const ACTIVATE_ATELJE = 'ACTIVATE_ATELJE';
export const ACTIVATE_AUTOR = 'ACTIVATE_AUTOR';
export const ACTIVATE_UMETNICKO_DELO = 'ACTIVATE_UMETNICKO_DELO';

export const initActive = {
    activate: 'Atelje',
    id: -1
};

export function activateReducer(state = initActive, action) {
    switch (action.type) {
        case 'Atelje':
            return {
                activate: 'Atelje',
                id: action.id
            };
        case 'UmetnickoDelo':
            return {
                activate: 'UmetnickoDelo',
                id: action.id
            };
        case 'Autor':
            return {
                activate: 'Autor',
                id: action.id
            };
        case 'Id':
            return {
                activate: state.activate,
                id: action.id
            }
        default:
            return initActive;
    };
};

export const storeActivate = createStore(activateReducer);