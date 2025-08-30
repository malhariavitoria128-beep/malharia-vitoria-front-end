export interface ItemPedido {
  descricao: string;
  quantidade: number;
  tamanho?: string;
  valorUnitario: number;
  imagem?: string;

  prioridade?: "Sim" | "Não";
  retirada?: "Sim" | "Não";
  temSublimacao?: "Sim" | "Não";
  statusSublimacao?: string;

  temPintura?: "Sim" | "Não";
  statusPintura?: string;

  temBordado?: "Sim" | "Não";
  statusBordado?: string;

  temDtf?: "Sim" | "Não";
  statusDtf?: string;

  temSilk?: "Sim" | "Não";
  statusSilk?: string;

  // 🔹 Etapas obrigatórias com marcador
  temCorte?: "Sim" | "Não";
  statusCorte?: string;

  temCostura?: "Sim" | "Não";
  statusCostura?: string;

  temDobragem?: "Sim" | "Não";
  statusDobragem?: string;

  temConferencia?: "Sim" | "Não";
  statusConferencia?: string;

    temRetirada?: "Sim" | "Não";
  statusRetirada?: string;
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
