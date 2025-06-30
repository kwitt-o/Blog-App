import { Component, inject, OnInit } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { CommentFormComponent } from '../../comments/comment-form/comment-form.component';
import { CommentListComponent } from '../../comments/comment-list/comment-list.component';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-post',
  imports: [PostCardComponent, CommentFormComponent, CommentListComponent, CommonModule],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css'
})
export class SinglePostComponent implements OnInit {
  private postService = inject(PostsService);
  private route = inject(ActivatedRoute);
  postData: any;
  similarPosts: any[] = [];


  ngOnInit(): void {
    this.route.params.subscribe(val => {

      this.postService.viewsCounter(val['id']);

      this.postService.loadOnePost(val['id']).subscribe(post => {
        this.postData = post;
        this.loadSimilarPosts(this.postData.category.categoryId);
      });
    })
  }

  loadSimilarPosts(catId: string) {
    this.postService.loadSimilarPosts(catId).subscribe(posts => {
      // this.similarPosts = val;
      this.similarPosts = posts.filter(post => post.id !== this.postData.id);
    })
  }

}
