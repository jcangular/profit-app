import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as profitActions from '../profit/profit.actions';

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { ProfitService } from '../services/profit.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styles: [
    ]
})
export class DashboardComponent implements OnInit, OnDestroy {

    userSubs: Subscription;
    itemsSubs: Subscription;

    constructor(
        private store: Store<AppState>,
        private profitService: ProfitService
    ) { }

    ngOnInit(): void {
        // Suscripción al estado del AuthReducer.
        this.userSubs = this.store.select('user')
            .pipe(filter(state => state.user !== null))
            .subscribe(({ user }) => {
                this.itemsSubs = this.profitService.itemsListener(user.uid).subscribe(itemsFB => {
                    this.store.dispatch(profitActions.setItems({ items: itemsFB }));
                });
            });

    }

    ngOnDestroy(): void {
        this.itemsSubs?.unsubscribe();
        this.userSubs?.unsubscribe();
    }

}
