import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NewPassword } from '../../core/models/login/login.model';
import { ApiResponse } from '../../core/models/api-response';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-change-password',
  standalone: false,
  templateUrl: './change-password.html',
  styleUrl: './change-password.css'
})
export class ChangePassword {

  changeForm!: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.changeForm = this.fb.group(
      {
        password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    if (!group.get('confirmPassword')?.dirty) return null;
    return password === confirm ? null : { passwordMismatch: true };
  }

  alterar() {
    if (!this.changeForm.valid) {
      this.changeForm.markAllAsTouched();
      return;
    }

    const request: any = {
      newPassword: this.changeForm.value.password
    };

    this.alterarService(request);
  }

  alterarService(request: NewPassword) {
    this.authService.changePassword(request)
      .pipe(take(1))
      .subscribe({
        next: (response: ApiResponse) => {
          this.toastr.success(response.message, 'Sucesso');
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
      },
    });
  }

    togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


}


