import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  badgevisible: boolean = true;

  constructor(private router: Router) { }
  badgevisibility() {
    this.badgevisible = !this.badgevisible;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/main/login']);
  }
}
