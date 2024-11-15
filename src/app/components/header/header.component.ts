import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import HomeComponent from 'src/app/pages/home/home.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule,HomeComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) { } 


  authService = inject(AuthService);
  isLoggedIn: boolean = false;
  isMenuOpen = false;
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(res => {
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }

  logout() {
    localStorage.removeItem("user_id");
    this.authService.isLoggedIn$.next(false);
  }

  navigateToAdminRegister() {
    this.router.navigate(['/register'], { queryParams: { isAdmin: true } });
  }


}
