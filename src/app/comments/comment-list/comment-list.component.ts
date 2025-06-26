import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from '../../services/comments.service';
import { BlogComment } from '../../models/comment';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-comment-list',
  imports: [CommonModule],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css'
})
export class CommentListComponent implements OnInit {
  postId!: string;
  comments: BlogComment[] = [];

  private route = inject(ActivatedRoute);
  private commentService = inject(CommentsService);


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postId = params.get('id') || '';

      this.loadComments(this.postId);
    })
  }

  loadComments(postId: string) {
    this.commentService.loadCommentsByPost(postId).subscribe(data => {
      this.comments = data.map(comment => {
        return {
          ...comment,
          createdAt: comment.createdAt instanceof Timestamp
            ? comment.createdAt.toDate()
            : comment.createdAt
        }
      });
    })
  }
}
