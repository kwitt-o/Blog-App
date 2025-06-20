import { Component, inject, OnInit } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-category',
  imports: [PostCardComponent, CommonModule],
  templateUrl: './single-category.component.html',
  styleUrl: './single-category.component.css'
})
export class SingleCategoryComponent implements OnInit {
  private postService = inject(PostsService)
  private route = inject(ActivatedRoute);

  categoryPosts: any[] = [];
  categoryObj: any;

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      this.categoryObj = val;
      this.postService.loadCategoryPosts(val['id']).subscribe(posts => {
        this.categoryPosts = posts;
      })
    })
  }

}
