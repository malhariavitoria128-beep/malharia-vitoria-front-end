import { LoginResquest, UsuarioAutenticado } from './../../core/models/login/login.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ApiResponse } from '../../core/models/api-response';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit{

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {}

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
    const request: LoginResquest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.logarService(request);
  }

logarService(request: LoginResquest) {
  console.log("Aqui: ", request);

  this.authService.login(request).subscribe({
    next: (usuario: UsuarioAutenticado) => {
      this.toastr.success(`Usuário ${usuario.email} logado`, "Sucesso");
      this.router.navigate(['/']);
    }
  });
}
}





