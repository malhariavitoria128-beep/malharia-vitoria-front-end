import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { PedidoService } from '../../../../services/pedido.service';
import { ItemPedido, Pedido } from '../../../../core/models/pedido/pedido.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ModalImagemItem } from '../../../../components/layout/modal-imagem-item/modal-imagem-item';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cadastrar-pedido',
  standalone: false,
  templateUrl: './cadastrar-pedido.html',
  styleUrl: './cadastrar-pedido.css'
})
export class CadastrarPedido {
  idPedido!: number;
  pedidoAtual?: Pedido;
  itemPedidoForm!: FormGroup;
  valorUnitarioDisplay: string = '';
  arquivoSelecionadoNome: string = '';

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.idPedido = Number(this.route.snapshot.paramMap.get('idPedido')!);
    this.carregarPedido();
    this.inicializarForm();
  }

inicializarForm() {
  this.itemPedidoForm = this.fb.group({
    descricao: ['', [Validators.required, Validators.maxLength(200)]],
    quantidade: ['', [Validators.required, Validators.min(1)]],
    tamanho: [''],
    valorUnitario: ['', Validators.required],
    dataEntrega: [''],
    imagem: [null],

    // 🔹 campos adicionais
    prioridade: [false],

    temPintura: [false],
    statusPintura: ['Não iniciado'],

    temBordado: [false],
    statusBordado: ['Não iniciado'],

    temDtf: [false],
    statusDtf: ['Não iniciado'],

    temSilk: [false],
    statusSilk: ['Não iniciado'],

    // sempre obrigatórios
    statusCorte: ['Não iniciado'],
    statusCostura: ['Não iniciado'],
    statusDobragem: ['Não iniciado'],
    statusConferencia: ['Não iniciado']
  });
}


  carregarPedido() {
    this.pedidoService.getPedidoById(this.idPedido).subscribe({
      next: (pedidoCompleto: Pedido) => {
        this.pedidoAtual = pedidoCompleto;
      },
      error: (err) => console.error('Erro ao carregar pedido', err)
    });
  }

  apenasNumerosEVirgula(event: any) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9,]/g, '');
    // Atualiza o formControl
    this.itemPedidoForm.get('valorUnitario')?.setValue(input.value);
  }

onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.arquivoSelecionadoNome = file.name; // só para mostrar o nome
    const reader = new FileReader();
    reader.onload = () => {
      this.itemPedidoForm.get('imagem')?.setValue(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
}
adicionarItem() {
  // Marca todos os campos do form como tocados/dirty
  Object.keys(this.itemPedidoForm.controls).forEach(key => {
    const control = this.itemPedidoForm.get(key);
    control?.markAsTouched();
    control?.markAsDirty();
  });

  this.itemPedidoForm.updateValueAndValidity();

  if (!this.itemPedidoForm.valid) {
    this.toastr.warning(
      'Por favor, preencha todos os campos obrigatórios corretamente.',
      'Atenção'
    );
    return;
  }

  // Pega os valores que realmente existem no form
  const fv = this.itemPedidoForm.value;

  const item: ItemPedido = {
    descricao: fv.descricao,
    quantidade: fv.quantidade,
    tamanho: fv.tamanho,
    valorUnitario: parseFloat((fv.valorUnitario || 0).toString().replace(',', '.')),
    imagem: fv.imagem,

    prioridade: this.booleanParaSimNao(fv.prioridade),

    temPintura: this.booleanParaSimNao(fv.temPintura),
    statusPintura: "Não iniciado",

    temBordado: this.booleanParaSimNao(fv.temBordado),
    statusBordado: "Não iniciado",

    temDtf: this.booleanParaSimNao(fv.temDtf),
    statusDtf: "Não iniciado",

    temSilk: this.booleanParaSimNao(fv.temSilk),
    statusSilk: "Não iniciado",

    // Etapas obrigatórias fixas
    statusCorte: "Não iniciado",
    statusCostura: "Não iniciado",
    statusDobragem: "Não iniciado",
    statusConferencia: "Não iniciado"
  };

  this.pedidoService.adicionarItens(this.idPedido, item).subscribe({
    next: () => {
      const dataEntregaValue = this.itemPedidoForm.get('dataEntrega')?.value;
      if (dataEntregaValue) {
        this.pedidoService.atualizarDataEntrega(this.idPedido, dataEntregaValue)
          .subscribe({
            next: () => console.log('Data de entrega atualizada'),
            error: (err) => console.error('Erro ao atualizar data de entrega', err)
          });
      }

      this.toastr.success('Item adicionado com sucesso!', 'Sucesso');
      this.itemPedidoForm.reset();
      this.arquivoSelecionadoNome = '';
      this.carregarPedido();
    },
    error: (err) => {
      this.toastr.error(err?.error?.message || 'Erro ao salvar item', 'Erro');
    }
  });
}

private booleanParaSimNao(valor?: boolean): "Sim" | "Não" {
  return valor ? "Sim" : "Não";
}


abrirImagem(imagemBase64: string) {
  const imageSrc = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + imagemBase64);

  this.dialog.open(ModalImagemItem, {
    data: { imagem: imageSrc },
    width: '100vw',
    height: '100vh',
    maxWidth: '100vw',
    maxHeight: '100vh',
    panelClass: 'no-padding-modal',
    hasBackdrop: true,
    backdropClass: 'dark-backdrop'
  });
}

}

