import { Component } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-alterar-usuario',
  standalone: false,
  templateUrl: './alterar-usuario.html',
  styleUrl: './alterar-usuario.css'
})
export class AlterarUsuario {

    selectedCar!: number;

    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];

  constructor(private config: NgSelectConfig) {
      this.config.notFoundText = 'não localizado';
  }

}
