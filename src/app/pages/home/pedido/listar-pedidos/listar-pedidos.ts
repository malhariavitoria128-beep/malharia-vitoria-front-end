import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Pedido } from '../../../../core/models/pedido/pedido.model';
import { PedidoService } from '../../../../services/pedido.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ModalImagemItem } from '../../../../components/layout/modal-imagem-item/modal-imagem-item';
import { ModalAtualizarStatusItem } from '../../../../components/layout/modal-atualizar-status-item/modal-atualizar-status-item';

@Component({
  selector: 'app-listar-pedidos',
  standalone: false,
  templateUrl: './listar-pedidos.html',
  styleUrl: './listar-pedidos.css'
})
export class ListarPedidos {
    dataSource: Pedido[] = [];

getEtapas(item: any) {
  return [
    { label: 'Pintura', status: item.statusPintura, tem: item.temPintura, campo: 'statuspintura' },
    { label: 'Bordado', status: item.statusBordado, tem: item.temBordado, campo: 'statusbordado' },
    { label: 'DTF', status: item.statusDtf, tem: item.temDtf, campo: 'statusdtf' },
    { label: 'Silk', status: item.statusSilk, tem: item.temSilk, campo: 'statussilk' },
    { label: 'Corte', status: item.statusCorte, tem: item.temCorte, campo: 'statuscorte' },
    { label: 'Costura', status: item.statusCostura, tem: item.temCostura, campo: 'statuscostura' },
    { label: 'Dobragem', status: item.statusDobragem, tem: item.temDobragem, campo: 'statusdobragem' },
    { label: 'Conferência', status: item.statusConferencia, tem: item.temConferencia, campo: 'statusconferencia' },
    { label: 'Retirada', status: item.statusRetirada, tem: item.temRetirada, campo: 'statusretirada' }
  ];
}

  constructor(private pedidoService: PedidoService, private sanitizer: DomSanitizer, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.carregarPedidos();



  }

  carregarPedidos(): void {
    this.pedidoService.getPedidos().subscribe({
      next: pedidos => this.dataSource = pedidos,
      error: () => console.error('Erro ao carregar pedidos')
    });
  }

   temPrioridade(pedido: Pedido): boolean {
    return pedido.itens.some(i => i.prioridade === 'Sim');
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

  abrirModalStatus(item: any, etapa: any) {
  const dialogRef = this.dialog.open(ModalAtualizarStatusItem, {
    data: { label: etapa.label },
    width: '300px'
  });

  dialogRef.afterClosed().subscribe(statusSelecionado => {
    if (statusSelecionado) {
      this.atualizarStatus(item, etapa.campo, statusSelecionado);
    }
  });
}

atualizarStatus(item: any, campo: string, valor: string) {
  // Atualiza visualmente
  item[campo] = valor;

  // DTO para o back
  const dto = { campo, valor };

  // 🔹 Usa o ID do item agora que existe
  this.pedidoService.atualizarStatusItem(item.id, dto).subscribe({
    next: () => {
      console.log('Status atualizado!');
      this.carregarPedidos(); // recarrega a lista para atualizar visual
    },
    error: err => console.error(err)
  });
}


}




