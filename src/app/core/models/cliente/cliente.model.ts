export interface ClienteSalvar {
  nome: string;
  cpf?: string;
  cnpj?: string;
  email?: string;
  telefone?: string;
  cep?: string;
  endereco?: string;
}

export interface BuscarClientes {
  id?: number;
  nome: string;
  cpf?: string;
  cnpj?: string;
  email?: string;
  telefone?: string;
  cep?: string;
  endereco?: string;
}
