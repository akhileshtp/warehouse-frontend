import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    this.authService.loginService(this.loginForm.value).subscribe({
      next: (res) => {
        alert("Logged in Successfully!!");

        // Store user ID and token 
        localStorage.setItem("user_id", res.data._id);
        if (res.token) {
          localStorage.setItem("auth_token", res.token);
        }

        // Set user as logged in
        this.authService.isLoggedIn$.next(true);

        // Role-based navigation
        const roles = res.data.roles || [];
        if (roles.includes('Admin')) {
          this.router.navigate(['/home']);
        } else if (roles.includes('User')) {
          this.router.navigate(['/laborer-view']);
        } else {
          this.router.navigate(['/login']);
        }

        this.loginForm.reset();
      },
      error: (err) => {
        console.log(err);
        alert(err.error);
      }
    });
  }
}
