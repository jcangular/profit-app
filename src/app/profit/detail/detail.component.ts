import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppStateWithProfit } from '../profit.reducer';
// import * as profitActions from '../../profit/profit.actions';

import { Profit } from '../../models/profit.model';
import { ProfitService } from '../../services/profit.service';
import Swal from 'sweetalert2';

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
        private store: Store<AppStateWithProfit>,
        private profitService: ProfitService
    ) { }

    ngOnInit(): void {
        this.itemsSubs = this.store.select('profit').subscribe(({ items }) => this.items = items);
    }

    ngOnDestroy(): void {
        this.itemsSubs.unsubscribe();
    }

    remove(uidItem: string): void {
        this.profitService.removeItem(uidItem)
            .then(() => Swal.fire('Borrado', 'El item fue borrado', 'success'))
            .catch(ex => Swal.fire('Error al borrar item', ex.message, 'error'));
    }

}
