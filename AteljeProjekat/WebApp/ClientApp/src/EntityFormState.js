import { createStore } from 'redux';

export const SHOW_FORM = 'SHOW_FORM';
export const HIDE_FORM = 'HIDE_FORM';

export const initStateEntity = {
    type: HIDE_FORM,
    show: false
};

export function entityFormReducer(state = initStateEntity, action) {
    if (action.type == SHOW_FORM) {
        return {
            show: true
        };
    }
    else {
        return initStateEntity;
    }
};

export const entityStore = createStore(entityFormReducer);