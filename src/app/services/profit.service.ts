import { Injectable } from '@angular/core';

import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

import { AuthService } from '../services/auth.service';
import { Profit } from '../models/profit.model';

@Injectable({
    providedIn: 'root'
})
export class ProfitService {

    constructor(
        private firestore: AngularFirestore,
        private authService: AuthService
    ) { }

    addProfit(profit: Profit): Promise<DocumentReference> {
        return this.firestore.doc(`${this.authService.uid}/profit`)
            .collection('items')
            .add({ ...profit });
    }
}
