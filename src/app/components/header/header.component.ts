import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  isLoggedIn= false;
  isAdmin = false;
  isMenuOpen= false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscribe to reactive auth state
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.isAdmin = this.authService.isAdmin(); // Check if the user is an admin
      } else {
        this.isAdmin = false; // Reset admin state if logged out
      }
    });
  }

 logout(): void {
    // Clear session and reset states
    this.authService.logout();
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.router.navigate(['/login']);
  }

  navigateToAdminRegister(): void {
    this.router.navigate(['/register'], { queryParams: { isAdmin: true } });
  }
}