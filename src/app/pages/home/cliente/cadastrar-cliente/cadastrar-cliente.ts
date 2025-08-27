import { CepService } from './../../../../services/cep.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../../../services/cliente.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { cpfCnpjValidator } from '../../../../core/validators/cpfCnpj.validator';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClienteSalvar } from '../../../../core/models/cliente/cliente.model';

@Component({
  selector: 'app-cadastrar-cliente',
  standalone: false,
  templateUrl: './cadastrar-cliente.html',
  styleUrl: './cadastrar-cliente.css'
})
export class CadastrarCliente implements OnInit {

  registerClienteForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private toastr: ToastrService,
    private cepService: CepService,
    private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.setupCepListener();
  }

  initializeForm() {
    this.registerClienteForm = this.fb.group({
      nome: ['', [
        Validators.required,
        Validators.maxLength(100)
      ]],
      cpfCnpj: ['', [cpfCnpjValidator]],
      email: ['', [Validators.email]],
      telefone: ['', [
        Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)
      ]],
      cep: ['', [
        Validators.pattern(/^\d{2}\.\d{3}-\d{3}$/)
      ]],
      endereco: [''],
      complemento: ['']
    });
  }

    setupCepListener() {
    this.registerClienteForm.get('cep')?.valueChanges.subscribe(cep => {
      if (cep && cep.length === 10) {
        this.buscarEndereco(cep);
      }
    });

    this.registerClienteForm.get('complemento')?.valueChanges.subscribe(() => {
      const cep = this.registerClienteForm.get('cep')?.value;
      if (cep && cep.length === 10) {
        this.buscarEndereco(cep);
      }
    });
  }

  buscarEndereco(cep: string) {
    this.spinner.show('cep');

    this.cepService.buscarEnderecoPorCep(cep).subscribe({
      next: (endereco) => {
        const complemento = this.registerClienteForm.get('complemento')?.value;
        const enderecoFormatado = this.cepService.formatarEndereco(endereco, complemento);

        this.registerClienteForm.patchValue({
          endereco: enderecoFormatado
        });

        this.spinner.hide('cep');
      },
      error: (error) => {
        this.spinner.hide('cep');
        this.registerClienteForm.patchValue({ endereco: '' });
      }
    });
  }

  onComplementoChange() {
    const cep = this.registerClienteForm.get('cep')?.value;
    if (cep && cep.length === 10) {
      this.buscarEndereco(cep);
    }
  }

  getClienteModel(): ClienteSalvar {
    const formValue = this.registerClienteForm.value;
    const raw = formValue.cpfCnpj?.replace(/\D/g, '') || '';

    const cliente: any = {
      nome: formValue.nome,
      email: formValue.email,
      telefone: formValue.telefone,
      cep: formValue.cep,
      endereco: formValue.endereco,
      cpf: '',
      cnpj: ''
    };

    if (raw.length === 11) {
      cliente.cpf = formValue.cpfCnpj;
    } else if (raw.length === 14) {
      cliente.cnpj = formValue.cpfCnpj;
    }

    return cliente;
  }

  register() {
    Object.keys(this.registerClienteForm.controls).forEach(key => {
      const control = this.registerClienteForm.get(key);
      control?.markAsTouched();
      control?.markAsDirty();
    });

    this.registerClienteForm.updateValueAndValidity();

    if (!this.registerClienteForm.valid) {
      this.toastr.warning('Por favor, preencha todos os campos obrigatórios corretamente.', 'Atenção');
      return;
    }

    const request: ClienteSalvar = this.getClienteModel();
    this.registrarCliente(request);
  }

  registrarCliente(request: any) {
    this.clienteService.register(request).subscribe({
      next: (res) => {
        this.toastr.success(res.message, "Sucesso");
        this.router.navigate(['/cliente/listar-clientes']);
      },
      error: (err) => {
        this.toastr.error(err.details);
      }
    });
  }

}
