
export interface ItemPedido {
  descricao: string;
  quantidade: number;
  tamanho?: string;
  valorUnitario: number;
  imagem?: string; // Base64
}

export interface Pedido {
  id: number;
  numeroPedido: string;
  clienteId: number;
  nomeCliente?: string;
  dataPedido: string;
  valorTotal: number;
  status?: string;
  dataEntrega?: string;
  itens: ItemPedido[];
}
