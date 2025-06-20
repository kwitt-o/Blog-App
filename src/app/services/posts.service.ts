import { inject, Injectable } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { collection, where, query, limit, orderBy, doc, updateDoc, increment } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private firestore = inject(Firestore);

  constructor() { }

  loadFeaturedData(): Observable<any[]> {
    const postsRef = collection(this.firestore, 'posts');
    const featuredQuery = query(postsRef, where('isFeatured', '==', true), limit(4));
    return collectionData(featuredQuery, { idField: 'id' });
  }

  loadLatestPosts() {
    const postsRef = collection(this.firestore, 'posts');
    const latestPostsQuery = query(postsRef, orderBy('createdAt'));
    return collectionData(latestPostsQuery, { idField: 'id' });
  }

  loadCategoryPosts(categoryId: string) {
    const postsRef = collection(this.firestore, 'posts');
    const categoryQuery = query(postsRef, where('category.categoryId', '==', categoryId));
    return collectionData(categoryQuery, { idField: 'id' });
  }

  loadOnePost(id: string) {
    const postRef = doc(this.firestore, 'posts', id);
    return docData(postRef, { idField: 'id' });
  }

  loadSimilarPosts(catId: string) {
    const postsRef = collection(this.firestore, 'posts');
    const categoryQuery = query(postsRef, where('category.categoryId', '==', catId), limit(4));
    return collectionData(categoryQuery, { idField: 'id' });
  }

  viewsCounter(postId: string): Promise<void> {
    const postRef = doc(this.firestore, 'posts', postId);
    return updateDoc(postRef, {
      views: increment(1)
    })
  }
}
