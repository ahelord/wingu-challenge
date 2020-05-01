import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Commune } from '../models/commune.model';
@Injectable({
  providedIn: 'root'
})
export class CommuneService {

  constructor(private firestore: AngularFirestore) { }

   getCommunes() {
     return this.firestore.collection('communes', ref => ref.orderBy('order')).snapshotChanges();
  }
}
