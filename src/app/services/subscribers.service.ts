import { inject, Injectable } from '@angular/core';
import { Subscription } from '../models/subscription';
import { addDoc, collection, collectionData, Firestore, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {
  private firestore = inject(Firestore);

  constructor() { }

  addSubs(subData: Subscription) {
    const subRef = collection(this.firestore, 'subscribers');

    addDoc(subRef, subData).then(() => {
      // console.log('Subscriber Saved Succcessfully');
    })
  }

  checkSub(subEmail: string) {
    const subRef = collection(this.firestore, 'subscribers');
    const subQuery = query(subRef, where('email', '==', subEmail));

    return getDocs(subQuery).then(snapshot => {
      return !snapshot.empty;
    })
  }
}

