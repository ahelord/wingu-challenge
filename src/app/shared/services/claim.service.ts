import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Claim } from '../models/claim.model';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  constructor(private firestore: AngularFirestore) { }
  getClaims() {
    return this.firestore.collection('claims').snapshotChanges();
  }
  createClaim(claim: Claim){
    return this.firestore.collection('claims').add({...claim});
  }
}
