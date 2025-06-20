import { Component, OnInit, Output, OutputEmitterRef } from '@angular/core';
import { inject } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { PostsService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [PostCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  featuredPosts: any[] = [];
  latestPosts: any[] = [];

  private postService = inject(PostsService);

    ngOnInit() {
    this.postService.loadFeaturedData().subscribe(data => {
      this.featuredPosts = data;
    })

    this.postService.loadLatestPosts().subscribe(data => {
      this.latestPosts = data;
    })
  }

}
