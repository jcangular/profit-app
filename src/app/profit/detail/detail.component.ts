import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
// import * as profitActions from '../../profit/profit.actions';

import { Profit } from '../../models/profit.model';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styles: [
    ]
})
export class DetailComponent implements OnInit, OnDestroy {

    items: Profit[] = [];
    itemsSubs: Subscription;

    constructor(
        private store: Store<AppState>
    ) { }

    ngOnInit(): void {
        this.itemsSubs = this.store.select('profit').subscribe(({ items }) => this.items = items);
    }

    ngOnDestroy(): void {
        this.itemsSubs.unsubscribe();
    }

    remove(uid: string): void {
        console.log('Remover: ', uid);
    }

}
