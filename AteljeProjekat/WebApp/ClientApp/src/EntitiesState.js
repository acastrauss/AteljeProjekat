import { createStore } from 'redux';

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