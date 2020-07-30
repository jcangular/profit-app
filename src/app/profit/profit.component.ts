import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Profit } from '../models/profit.model';
import { ProfitService } from '../services/profit.service';

import Swal from 'sweetalert2';

@Component({
    selector: 'app-profit',
    templateUrl: './profit.component.html',
    styles: [
    ]
})
export class ProfitComponent implements OnInit {

    profitForm: FormGroup;
    type: string;
    @ViewChild('inputDesc') inputDesc: ElementRef<HTMLInputElement>;

    constructor(
        private fb: FormBuilder,
        private profitService: ProfitService
    ) {
        this.type = 'ingreso';
    }

    ngOnInit(): void {
        this.profitForm = this.fb.group({
            description: ['', Validators.required],
            amount: ['', Validators.required]
        });
    }

    save(): void {

        if (this.profitForm.invalid) {
            return;
        }

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
            });

    }

}
