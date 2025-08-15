import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterResquest } from '../../core/models/login/login.model';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      nome: ['', Validators.required],
    });
  }

  register() {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      Object.values(this.registerForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
      return;
    }

    const request: RegisterResquest = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      nome: this.registerForm.value.nome
    };
    this.registrarService(request);
  }

  registrarService(request: RegisterResquest) {
    this.authService.register(request).subscribe({
      next: (res) => {
        console.log('Usuário registrado:', res.message);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // err.error contém o corpo da resposta do backend
        const detalhes = err.error?.details;
        console.error('Erro no registro:', detalhes);
        // Mostrar mensagem para usuário
      }
    });
  }

}
