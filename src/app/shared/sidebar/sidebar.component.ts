import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscriber, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styles: [
        `li { cursor:pointer; }`
    ]
})
export class SidebarComponent implements OnInit, OnDestroy {

    userSubs: Subscription;
    userName: string;

    constructor(
        private route: Router,
        private authService: AuthService,
        private store: Store<AppState>
    ) { }

    ngOnInit(): void {
        this.userSubs = this.store.select('user')
            .pipe(
                filter(({ user }) => user != null)
            )
            .subscribe(({ user }) => this.userName = user.name);
    }

    ngOnDestroy(): void {
        this.userSubs.unsubscribe();
    }

    signOut(): void {
        this.authService.signOut()
            .then(() => this.route.navigate(['/login']))
            .catch();
    }

}
