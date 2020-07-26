import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [
    ]
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    @ViewChild('inputMail') inputMail: ElementRef<HTMLInputElement>;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {

        this.registerForm = this.fb.group({
            name: ['', Validators.required],
            mail: ['', [Validators.required, Validators.email]],
            pass: ['', Validators.required],
        });

    }

    onRegister(): void {

        if (this.registerForm.invalid) {
            return;
        }

        // Mensaje de espera
        Swal.fire({
            title: '¡Resgistrandote..!',
            onBeforeOpen: () => Swal.showLoading()
        });

        const { name, mail, pass } = this.registerForm.value;

        this.authService.register(name, mail, pass)
            .then(() => {
                Swal.close();
                this.router.navigate(['/']);
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
