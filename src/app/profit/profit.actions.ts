import { createAction, props } from '@ngrx/store';
import { Profit } from '../models/profit.model';

export const unsetItems = createAction('[Profit] Unset Items');
export const setItems = createAction(
    '[Profit] Set Items',
    props<{ items: Profit[]; }>()
);
