import { LoginRegisterResquest, UsuarioAutenticado } from './../../core/models/login/login.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ApiResponse } from '../../core/models/api-response';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit{

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
     this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  logar() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });;
      return;
    }
    const request: LoginRegisterResquest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.logarService(request);
  }

logarService(request: LoginRegisterResquest) {
  console.log("Aqui: ", request);

  this.authService.login(request).subscribe({
    next: (usuario: UsuarioAutenticado) => {
      console.log('Usuário autenticado:', usuario);
      this.router.navigate(['/']);
    },
    error: (err: ApiResponse<null>) => {
      // Aqui, err já vem padronizado pelo interceptor
      console.error('Erro ao logar:', err);

      // Se quiser exibir no componente (opcional, já mostra no interceptor)
      // this.toastr.error(err.message, 'Erro de Login');
    }
  });
}
}





