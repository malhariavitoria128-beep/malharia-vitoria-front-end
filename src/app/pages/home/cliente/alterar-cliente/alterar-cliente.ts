import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { CepService } from '../../../../services/cep.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { cpfCnpjValidator } from '../../../../core/validators/cpfCnpj.validator';
import { ClienteSalvar } from '../../../../core/models/cliente/cliente.model';

@Component({
  selector: 'app-alterar-cliente',
  standalone: false,
  templateUrl: './alterar-cliente.html',
  styleUrl: './alterar-cliente.css'
})
export class AlterarCliente {
  editarClienteForm!: FormGroup;
  clienteId!: number;
  ultimoEndereco: any = null; // Adicionar para armazenar o endereço sem complemento
  cepOriginal: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private toastr: ToastrService,
    private cepService: CepService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.clienteId = Number(this.route.snapshot.paramMap.get('id'));
    this.initializeForm();
    this.setupCepListener();
    this.carregarCliente(this.clienteId);
  }

  initializeForm() {
    this.editarClienteForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      cpfCnpj: ['', [cpfCnpjValidator]],
      email: ['', [Validators.email]],
      telefone: ['', [Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)]],
      cep: ['', [Validators.pattern(/^\d{2}\.\d{3}-\d{3}$/)]],
      endereco: [''],
      complemento: ['']
    });
  }

  setupCepListener() {
    this.editarClienteForm.get('cep')?.valueChanges.subscribe(cep => {
      if (cep && cep.length === 10) this.buscarEndereco(cep);
    });

    this.editarClienteForm.get('complemento')?.valueChanges.subscribe(complemento => {
      this.atualizarEnderecoComComplemento(complemento);
    });
  }

  buscarEndereco(cep: string) {
    this.spinner.show('cep');
    this.cepService.buscarEnderecoPorCep(cep).subscribe({
      next: (endereco) => {
        this.ultimoEndereco = endereco; // Armazena o endereço sem complemento
        const complemento = this.editarClienteForm.get('complemento')?.value;
        const enderecoFormatado = this.cepService.formatarEndereco(endereco, complemento);
        this.editarClienteForm.patchValue({ endereco: enderecoFormatado });
        this.spinner.hide('cep');
      },
      error: () => {
        this.spinner.hide('cep');
        this.editarClienteForm.patchValue({ endereco: '' });
        this.ultimoEndereco = null;
      }
    });
  }

  atualizarEnderecoComComplemento(complemento: string) {
    if (this.ultimoEndereco) {
      const enderecoFormatado = this.cepService.formatarEndereco(this.ultimoEndereco, complemento);
      this.editarClienteForm.patchValue({
        endereco: enderecoFormatado
      }, { emitEvent: false });
    }
  }

  carregarCliente(id: number) {
  this.spinner.show();
  this.clienteService.getById(id).subscribe({
    next: (cliente: any) => {
      const { enderecoSemComplemento, complemento } = this.extrairComplementoDoEndereco(cliente.endereco);

      // Guarda o CEP original
      this.cepOriginal = cliente.cep; // <--- GUARDA O CEP ORIGINAL

      this.editarClienteForm.patchValue({
        nome: cliente.nome,
        cpfCnpj: cliente.cpf || cliente.cnpj,
        email: cliente.email,
        telefone: cliente.telefone,
        cep: cliente.cep || '', // Mostra vazio se for null
        endereco: enderecoSemComplemento,
        complemento: complemento
      });

      // Se temos CEP, buscar o endereço completo
      if (cliente.cep && cliente.cep.length === 10) {
        this.buscarEndereco(cliente.cep);
      }

      this.spinner.hide();
    },
    error: () => {
      this.spinner.hide();
      this.toastr.error('Erro ao carregar cliente');
    }
  });
}

  // Método para extrair complemento do endereço
  extrairComplementoDoEndereco(enderecoCompleto: string): { enderecoSemComplemento: string, complemento: string } {
    if (!enderecoCompleto) {
      return { enderecoSemComplemento: '', complemento: '' };
    }

    // Procura por "Complemento:" no texto
    const complementoIndex = enderecoCompleto.indexOf('Complemento:');

    if (complementoIndex !== -1) {
      const enderecoSemComplemento = enderecoCompleto.substring(0, complementoIndex).trim();
      const complemento = enderecoCompleto.substring(complementoIndex + 12).trim();

      return { enderecoSemComplemento, complemento };
    }

    // Se não encontrar "Complemento:", retorna o endereço completo e complemento vazio
    return { enderecoSemComplemento: enderecoCompleto, complemento: '' };
  }

  getClienteModel(): ClienteSalvar {
  const formValue = this.editarClienteForm.value;
  const raw = formValue.cpfCnpj?.replace(/\D/g, '') || '';

  // Se o CEP não foi alterado (está vazio), usa o original
  const cepParaSalvar = formValue.cep && formValue.cep.trim() !== ''
    ? formValue.cep
    : this.cepOriginal;

  const cliente: ClienteSalvar = {
    nome: formValue.nome,
    email: formValue.email,
    telefone: formValue.telefone,
    cep: cepParaSalvar, // <--- USA CEP CORRETO
    endereco: formValue.endereco,
    cpf: undefined,
    cnpj: undefined
  };

  if (raw.length === 11) cliente.cpf = formValue.cpfCnpj;
  else if (raw.length === 14) cliente.cnpj = formValue.cpfCnpj;

  return cliente;
}

  salvarAlteracoes() {
    Object.keys(this.editarClienteForm.controls).forEach(key => {
      const control = this.editarClienteForm.get(key);
      control?.markAsTouched();
      control?.markAsDirty();
    });

    if (!this.editarClienteForm.valid) {
      this.toastr.warning('Preencha todos os campos obrigatórios corretamente.', 'Atenção');
      return;
    }

    const request = this.getClienteModel();
    this.clienteService.update(this.clienteId, request).subscribe({
      next: (res) => {
        this.toastr.success(res.message, 'Sucesso');
        this.router.navigate(['/cliente/listar-clientes']);
      },
      error: (err) => {
        this.toastr.error(err.details || 'Erro ao atualizar cliente');
      }
    });
  }
}
