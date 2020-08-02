import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styles: [
    ]
})
export class NavbarComponent implements OnInit, OnDestroy {

    userSubs: Subscription;
    userName: string;

    constructor(
        private store: Store<AppState>
    ) { }

    ngOnInit(): void {
        this.userSubs = this.store.select('user').pipe(
            filter(({ user }) => user != null)
        )
            .subscribe(({ user }) => this.userName = user.name);
    }

    ngOnDestroy(): void {
        this.userSubs.unsubscribe();
    }

}
