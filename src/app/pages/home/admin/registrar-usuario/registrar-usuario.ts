import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterAdminResquest } from '../../../../core/models/login/login.model';
import { UsuarioService } from '../../../../services/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrar-usuario',
  standalone: false,
  templateUrl: './registrar-usuario.html',
  styleUrl: './registrar-usuario.css'
})
export class RegistrarUsuario implements OnInit{

  registerAdminForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

    initializeForm() {
    this.registerAdminForm = this.fb.group({
      nome: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
    ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(30)
      ]]
    });
  }

  register() {
    if (!this.registerAdminForm.valid) {
      this.registerAdminForm.markAllAsTouched();
      Object.values(this.registerAdminForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
      return;
    }
    const request: RegisterAdminResquest = {
      email: this.registerAdminForm.value.email,
      nome: this.registerAdminForm.value.nome
    };
    this.registrarService(request);
  }

  registrarService(request: RegisterAdminResquest) {
    this.usuarioService.register(request).subscribe({
      next: (res) => {
        this.toastr.success(res.message, "Sucesso");
        this.router.navigate(['/admin/listar-usuarios', 'aprovados']);
      },
      error: (err) => {
        this.toastr.error(err.details);
      }

    });
  }

}
