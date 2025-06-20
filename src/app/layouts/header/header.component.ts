import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryNavbarComponent } from '../category-navbar/category-navbar.component';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
