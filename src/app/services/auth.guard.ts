import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private authService: AuthService,
        private route: Router
    ) { }

    canLoad(): Observable<boolean> {
        return this.authService.isSingIn().pipe(
            tap(state => {
                if (!state) {
                    this.route.navigate(['/login']);
                }
            }), take(1)
        );
    }


    canActivate(): Observable<boolean> {
        return this.authService.isSingIn().pipe(
            tap(state => {
                if (!state) {
                    this.route.navigate(['/login']);
                }
            })
        );
    }



}
