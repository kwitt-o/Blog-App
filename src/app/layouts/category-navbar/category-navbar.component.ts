import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './category-navbar.component.html',
  styleUrl: './category-navbar.component.css'
})
export class CategoryNavbarComponent implements OnInit {
   categories: any[] = [];

private categoryService = inject(CategoriesService);


ngOnInit(): void {
  this.categoryService.loadData().subscribe(data => {
      this.categories = data;
    }) 
}

}
