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
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
    ]
})
export class LoginComponent implements OnInit, OnDestroy {

    loginForm: FormGroup;
    loding: boolean;
    uiSubs: Subscription;
    @ViewChild('inputMail') inputMail: ElementRef<HTMLInputElement>;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private route: Router,
        private store: Store<AppState>
    ) { }


    ngOnInit(): void {
        this.loginForm = this.fb.group({
            mail: ['', [Validators.required, Validators.email]],
            pass: ['', Validators.required]
        });

        this.uiSubs = this.store.select('ui').subscribe(state => this.loding = state.loading);
    }

    ngOnDestroy(): void {
        this.uiSubs.unsubscribe();
    }


    login(): void {
        if (this.loginForm.invalid) {
            return;
        }

        this.store.dispatch(ui.isLoading());

        // Mensaje de espera
        // Swal.fire({
        //     title: '¡Iniciando sesión..!',
        //     onBeforeOpen: () => Swal.showLoading()
        // });

        const { mail, pass } = this.loginForm.value;
        this.authService.login(mail, pass)
            .then(result => {
                // Swal.close();
                this.store.dispatch(ui.stopLoading());
                this.route.navigate(['/']);
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
