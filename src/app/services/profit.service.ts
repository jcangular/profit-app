import { Injectable } from '@angular/core';

import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

import { AuthService } from '../services/auth.service';
import { Profit } from '../models/profit.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfitService {

    constructor(
        private firestore: AngularFirestore,
        private authService: AuthService
    ) { }

    addProfit(profit: Profit): Promise<DocumentReference> {
        const item = { ...profit };
        delete item.uid;
        return this.firestore.doc(`${this.authService.uid}/profit`)
            .collection('items')
            .add({ ...item });
    }

    /**
     * Devuelve un Observable con la colección de items del usuario.
     * @param uid es el id del usuari en Firebase.
     */
    itemsListener(uid: string): Observable<Profit[]> {
        return this.firestore.collection(`${uid}/profit/items`)
            .snapshotChanges()
            .pipe(
                map(snapshot => snapshot.map(doc => ({
                    uid: doc.payload.doc.id,
                    ...doc.payload.doc.data() as Profit
                })))
            );
    }
    /**
     * Remueve un item de la colección de items en Firestore.
     * @param uid es el id del item en Firestore.
     */
    removeItem(uidItem: string): Promise<void> {
        return this.firestore.doc(`${this.authService.uid}/profit/items/${uidItem}`).delete();
    }

}
