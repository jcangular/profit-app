import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [
    ]
})
export class RegisterComponent implements OnInit, OnDestroy {

    registerForm: FormGroup;
    loding: boolean;
    uiSubs: Subscription;
    @ViewChild('inputMail') inputMail: ElementRef<HTMLInputElement>;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private store: Store<AppState>
    ) { }

    ngOnInit(): void {

        this.registerForm = this.fb.group({
            name: ['', Validators.required],
            mail: ['', [Validators.required, Validators.email]],
            pass: ['', Validators.required],
        });

        this.uiSubs = this.store.select('ui').subscribe(state => this.loding = state.loading);

    }

    ngOnDestroy(): void {
        this.uiSubs.unsubscribe();
    }

    onRegister(): void {

        if (this.registerForm.invalid) {
            return;
        }

        this.store.dispatch(ui.isLoading());

        // Mensaje de espera
        // Swal.fire({
        //     title: '¡Resgistrandote..!',
        //     onBeforeOpen: () => Swal.showLoading()
        // });

        const { name, mail, pass } = this.registerForm.value;

        this.authService.register(name, mail, pass)
            .then(() => {
                // Swal.close();
                this.store.dispatch(ui.stopLoading());
                this.router.navigate(['/']);
            })
            .catch(ex => {
                this.store.dispatch(ui.stopLoading());
                Swal.fire({
                    icon: 'error',
                    title: 'Oops..!',
                    text: ex.message,
                    onAfterClose: () => setTimeout(() => this.inputMail.nativeElement.select(), 10)
                });
            });
    }

}
