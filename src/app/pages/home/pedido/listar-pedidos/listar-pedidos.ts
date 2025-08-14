import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-listar-pedidos',
  standalone: false,
  templateUrl: './listar-pedidos.html',
  styleUrl: './listar-pedidos.css'
})
export class ListarPedidos {
  pedidos: any[] = [];
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarPedidos();
  }

  carregarPedidos() {
    this.http.get('https://localhost:7015/api/Pedido').subscribe({
    next: (data: any) => {
      this.pedidos = data;
      this.error = null;
    },
    error: (err) => {

    }
  });
  }

}


