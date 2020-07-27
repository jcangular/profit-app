import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';

import { User } from '../models/user.models';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    fsUserSubs: Subscription;

    constructor(
        private auth: AngularFireAuth,
        private firestore: AngularFirestore,
        private store: Store<AppState>
    ) { }

    /**
     * Inicializa la suscripción al AngularFireAuth.authState.
     */
    initAuthListener(): void {
        this.auth.authState.subscribe(fUser => {
            if (fUser) {
                this.fsUserSubs = this.firestore.doc(`${fUser.uid}/user`)
                    .valueChanges()
                    .subscribe((fsUser: any) => {
                        const user = User.fromFirebase(fsUser);
                        this.store.dispatch(authActions.setUser({ user }));
                    });
            } else {
                this.fsUserSubs.unsubscribe();
                this.store.dispatch(authActions.unsetUser());
            }
        });
    }

    /**
     * Registra un nuevo usuario en firebase y crea su documento en Firestore.
     * @param name es el nombre del usuario.
     * @param mail es el correo electrónico del usuario.
     * @param pass es la contraseña del usuario.
     */
    async register(name: string, mail: string, pass: string): Promise<void> {
        return this.auth.createUserWithEmailAndPassword(mail, pass)
            .then(({ user }) => {
                // actualiza el displayName
                user.updateProfile({
                    displayName: name
                }).then(resp => { });

                const newUser = new User(user.uid, name, mail);

                // Crea un documento (Firestore) asociado con uid del usuario registrado.
                return this.firestore.doc(`${user.uid}/user`)
                    .set({ ...newUser });
            });
    }

    /**
     * Inicia la sesión para un usuario.
     * @param mail es el correo electrónico del usuario.
     * @param pass es la contraseña del usuario.
     */
    login(mail: string, pass: string): Promise<firebase.auth.UserCredential> {
        return this.auth.signInWithEmailAndPassword(mail, pass);
    }

    /**
     * Cierra la sesión del usuario.
     */
    signOut(): Promise<void> {
        return this.auth.signOut();
    }

    /**
     * Indica si hay un usuario con una sesión activa.
     */
    isSingIn(): Observable<boolean> {
        return this.auth.authState.pipe(
            map(user => user != null)
        );
    }
}
