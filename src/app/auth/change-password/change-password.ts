import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NewPassword } from '../../core/models/login/login.model';
import { ApiResponse } from '../../core/models/api-response';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  standalone: false,
  templateUrl: './change-password.html',
  styleUrl: './change-password.css'
})
export class ChangePassword {

    changeForm!: FormGroup;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.changeForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordsMatchValidator } // Validador customizado
    );
  }

passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  if (!group.get('confirmPassword')?.dirty) return null; // só validar depois de começar a digitar
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
  console.log("Aqui: ", request);

  this.authService.changePassword(request).subscribe({
    next: (response: ApiResponse) => {
      this.toastr.success(response.message, 'Sucesso');

      // 🔹 Remove token do armazenamento
      localStorage.removeItem('token'); // ou sessionStorage
      // Se tiver mais dados sensíveis, pode limpar tudo:
      // localStorage.clear();

      this.router.navigate(['/login']);
    },
    error: (err: ApiResponse<null>) => {
      console.error('Erro ao alterar senha:', err);
    }
  });
}


}


