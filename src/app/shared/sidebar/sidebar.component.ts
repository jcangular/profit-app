import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styles: [
        `li { cursor:pointer; }`
    ]
})
export class SidebarComponent implements OnInit {

    constructor(
        private route: Router,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
    }

    signOut(): void {
        this.authService.signOut()
            .then(() => this.route.navigate(['/login']))
            .catch();
    }

}
