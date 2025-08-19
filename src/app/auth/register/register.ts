import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterResquest } from '../../core/models/login/login.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      nome: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(30)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]]
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
        this.toastr.success(res.message, "Sucesso");
        this.router.navigate(['/login']);
      },
    });
  }

}
