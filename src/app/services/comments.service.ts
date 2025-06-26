import { Injectable, inject } from '@angular/core';
import { addDoc, collection, Firestore, where, query, collectionData } from '@angular/fire/firestore';
import { BlogComment } from '../models/comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private firestore = inject(Firestore);

  constructor() { }

  addComment(commentData: BlogComment) {
    const commentsRef = collection(this.firestore, 'comments');

    addDoc(commentsRef, commentData).then(() => {
      // console.log('Comments saved to Firestore successfully');
    })
  }

  loadCommentsByPost(postId: string): Observable<BlogComment[]> {
    const commentsRef = collection(this.firestore, 'comments');
    const queryRef = query(commentsRef, where('postId', '==', postId));
    return collectionData(queryRef, {idField: 'id'}) as Observable<BlogComment[]>
  }
}
