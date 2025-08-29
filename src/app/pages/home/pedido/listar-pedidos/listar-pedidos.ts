import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Pedido } from '../../../../core/models/pedido/pedido.model';
import { PedidoService } from '../../../../services/pedido.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ModalImagemItem } from '../../../../components/layout/modal-imagem-item/modal-imagem-item';

@Component({
  selector: 'app-listar-pedidos',
  standalone: false,
  templateUrl: './listar-pedidos.html',
  styleUrl: './listar-pedidos.css'
})
export class ListarPedidos {
    dataSource: Pedido[] = [];

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
}




