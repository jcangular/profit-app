import { createReducer, on } from '@ngrx/store';

import { setItems, unsetItems } from './profit.actions';
import { Profit } from '../models/profit.model';
import { AppState } from '../app.reducer';

export interface State {
    items: Profit[];
}

// Nueva interface para soportar la LazyLoad para el Profit State.
export interface AppStateWithProfit extends AppState {
    profit: State;
}

export const initialState: State = {
    items: []
};


const innerProfitReducer = createReducer(initialState,

    on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(unsetItems, state => ({ ...state, items: [] })),

);

export function profitReducer(state: State, action) {
    return innerProfitReducer(state, action);
}