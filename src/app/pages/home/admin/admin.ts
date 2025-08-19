import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

  filtroSelecionado: string = 'pendentes';

   constructor(private router: Router) {}

  navegar(filtro: string) {
     this.filtroSelecionado = filtro; 
    this.router.navigate(['admin/listar-usuarios', filtro]);
  }

}
