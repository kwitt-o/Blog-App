import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommentsService } from '../../services/comments.service';
import { BlogComment } from '../../models/comment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent implements OnInit {
  postId!: string;
  successMessage: string = '';

  private commentService = inject(CommentsService);
  private route = inject(ActivatedRoute);


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postId = params.get('id') || '';
    });
  }



  onSubmit(commentForm: NgForm) {
    const commentData: BlogComment = {
      name: commentForm.value.name,
      comment: commentForm.value.comment,
      createdAt: new Date(),
      postId: this.postId
    }


    this.commentService.addComment(commentData);
    this.successMessage = 'Thanks for your comment!'
    commentForm.resetForm();

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }
}
