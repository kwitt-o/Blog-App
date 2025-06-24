import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  categories: any[] = [];
  isMenuOpen = false;
  isMobileDropdownOpen = false;

  private categoryService = inject(CategoriesService);

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(data => {
      this.categories = data;
      // console.log(data);
    });


  }



  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
     this.isMobileDropdownOpen = false;
  }

  toggleMobileDropdown() {
  this.isMobileDropdownOpen = !this.isMobileDropdownOpen;
}


}
