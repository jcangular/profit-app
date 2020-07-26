import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from '../models/user.models';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private auth: AngularFireAuth,
        private firestore: AngularFirestore
    ) { }

    initAuthListener(): void {
        this.auth.authState.subscribe(user => {
            console.log(user?.uid, user?.email);
        });
    }

    register(name: string, mail: string, pass: string): Promise<void> {
        return this.auth.createUserWithEmailAndPassword(mail, pass)
            .then(({ user }) => {
                // actualiza el displayName
                user.updateProfile({
                    displayName: name
                }).then(resp => { });

                const newUser = new User(user.uid, name, mail);

                return this.firestore.doc(`${user.uid}/user`)
                    .set({ ...newUser });
            });
    }

    login(mail: string, pass: string): Promise<firebase.auth.UserCredential> {
        return this.auth.signInWithEmailAndPassword(mail, pass);
    }

    signOut(): Promise<void> {
        return this.auth.signOut();
    }

    isSingIn(): Observable<boolean> {
        return this.auth.authState.pipe(
            map(user => user != null)
        );
    }
}
