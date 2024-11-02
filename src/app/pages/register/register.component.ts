import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../../app/validators/confirm-password.validator';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent implements OnInit {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  registerForm!: FormGroup;
  isAdmin: boolean = false;

  ngOnInit(): void {
    // Set up the form with validation
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        userName: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: confirmPasswordValidator('password', 'confirmPassword')
      }
    );

    // Check route parameters to set isAdmin
    this.route.queryParams.subscribe(params => {
      this.isAdmin = params['isAdmin'] === 'true';
    });
  }

  register() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;

      if (this.isAdmin) {
        // Register as an admin
        this.authService.registerAdminService(userData).subscribe({
          next: res => {
            alert('Admin Created!');
            this.registerForm.reset();
            this.router.navigate(['login']);
          },
          error: err => {
            console.error('Admin registration error:', err);
          }
        });
      } else {
        // Register as a regular user
        this.authService.registerService(userData).subscribe({
          next: res => {
            alert('User Created!');
            this.registerForm.reset();
            this.router.navigate(['login']);
          },
          error: (err: any) => {
            console.error('User registration error:', err);
          }
        });
      }
    }
  }
}
