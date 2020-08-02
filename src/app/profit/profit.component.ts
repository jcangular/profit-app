import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStateWithProfit } from './profit.reducer';
import * as ui from '../shared/ui.actions';

import Swal from 'sweetalert2';

import { Profit } from '../models/profit.model';
import { ProfitService } from '../services/profit.service';

@Component({
    selector: 'app-profit',
    templateUrl: './profit.component.html',
    styles: [
    ]
})
export class ProfitComponent implements OnInit, OnDestroy {

    profitForm: FormGroup;
    type: string;
    loading: boolean;
    uiSubs: Subscription;
    @ViewChild('inputDesc') inputDesc: ElementRef<HTMLInputElement>;

    constructor(
        private fb: FormBuilder,
        private profitService: ProfitService,
        private store: Store<AppStateWithProfit>
    ) {
        this.type = 'ingreso';
        this.loading = false;
    }

    ngOnInit(): void {

        this.profitForm = this.fb.group({
            description: ['', Validators.required],
            amount: ['', Validators.required]
        });

        setTimeout(() => this.inputDesc.nativeElement.select(), 10);

        this.uiSubs = this.store.select('ui').subscribe(({ loading }) => this.loading = loading);
    }

    ngOnDestroy(): void {
        this.uiSubs.unsubscribe();
    }

    save(): void {

        if (this.profitForm.invalid) {
            return;
        }

        this.store.dispatch(ui.isLoading());

        const { description, amount } = this.profitForm.value;
        const newProfit = new Profit(description, this.type, amount);
        this.profitService.addProfit(newProfit)
            .then(() => {
                this.profitForm.reset();
                Swal.fire('Registro creado', description, 'success');
                Swal.fire({
                    icon: 'success',
                    title: 'Registro creado',
                    text: description,
                    onAfterClose: () => setTimeout(() => this.inputDesc.nativeElement.select(), 10)
                });
            })
            .catch(ex => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al crear registro',
                    text: ex.message,
                    onAfterClose: () => setTimeout(() => this.inputDesc.nativeElement.select(), 10)
                });
                // Swal.fire('Error al crear registro', ex.message, 'error');
            }).finally(() => this.store.dispatch(ui.stopLoading()));

    }

}
