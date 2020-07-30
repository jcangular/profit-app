import { ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsOptions } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as profit from './profit/profit.reducer';


export interface AppState {
    ui: ui.State;
    user: auth.State;
    profit: profit.State;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: ui.uiReducer,
    user: auth.authReducer,
    profit: profit.profitReducer
};

export const devtoolsOptions: StoreDevtoolsOptions = {
    maxAge: 25,
    logOnly: environment.production,
};
