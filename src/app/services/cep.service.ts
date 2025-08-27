import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface EnderecoViaCep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) { }

  buscarEnderecoPorCep(cep: string): Observable<EnderecoViaCep> {
    const cepNumerico = cep.replace(/\D/g, '');

    if (cepNumerico.length !== 8) {
      throw new Error('CEP deve ter 8 dígitos');
    }

    return this.http.get<EnderecoViaCep>(`https://viacep.com.br/ws/${cepNumerico}/json/`);
  }

  formatarEndereco(endereco: EnderecoViaCep, complementoUsuario?: string): string {
    let enderecoCompleto = '';
      if (endereco.logradouro) {
        enderecoCompleto += endereco.logradouro;
      }
      if (endereco.complemento) {
        enderecoCompleto += `, ${endereco.complemento}`;
      }
      if (endereco.bairro) {
        enderecoCompleto += `, ${endereco.bairro}`;
      }
      if (endereco.localidade && endereco.uf) {
        enderecoCompleto += `, ${endereco.localidade} - ${endereco.uf}`;
      }
      if (complementoUsuario) {
        enderecoCompleto += ` - Complemento: ${complementoUsuario}`;
      }
    return enderecoCompleto;
  }

}

