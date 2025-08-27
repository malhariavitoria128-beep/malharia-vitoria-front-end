import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { PedidoService } from '../../../../services/pedido.service';
import { ItemPedido, Pedido } from '../../../../core/models/pedido/pedido.model';

@Component({
  selector: 'app-cadastrar-pedido',
  standalone: false,
  templateUrl: './cadastrar-pedido.html',
  styleUrl: './cadastrar-pedido.css'
})
export class CadastrarPedido {
  clienteId!: number;
  pedidoAtual?: Pedido;

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.clienteId = Number(this.route.snapshot.paramMap.get('idCliente'));
    this.cadastrarEPegarPedido();
  }

  cadastrarEPegarPedido() {
    // Cria novo pedido
    this.pedidoService.criarPedido(this.clienteId).subscribe({
      next: (pedidoCriado) => {
        console.log('Pedido criado:', pedidoCriado);

        // Pega o numeroPedido retornado e busca o pedido completo
        const numeroPedido = pedidoCriado.numeroPedido;
        this.pedidoService.getPedidoPorNumero(numeroPedido).subscribe({
          next: (pedidoCompleto: Pedido) => {
            this.pedidoAtual = pedidoCompleto;
            console.log('Pedido carregado:', this.pedidoAtual);
          },
          error: (err) =>
            console.error('Erro ao carregar pedido pelo número', err)
        });
      },
      error: (err) => console.error('Erro ao criar pedido', err)
    });
  }

  abrirAdicionarItem() {

  }

}
