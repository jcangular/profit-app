import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
    ]
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    @ViewChild('inputMail') inputMail: ElementRef<HTMLInputElement>;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private route: Router
    ) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            mail: ['', [Validators.required, Validators.email]],
            pass: ['', Validators.required]
        });
    }

    login(): void {
        if (this.loginForm.invalid) {
            return;
        }

        // Mensaje de espera
        Swal.fire({
            title: '¡Iniciando sesión..!',
            onBeforeOpen: () => Swal.showLoading()
        });

        const { mail, pass } = this.loginForm.value;
        this.authService.login(mail, pass)
            .then(result => {
                Swal.close();
                this.route.navigate(['/']);
            })
            .catch(ex => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops..!',
                    text: ex.message,
                    onAfterClose: () => setTimeout(() => this.inputMail.nativeElement.select(), 10)
                });
            });
    }

}
