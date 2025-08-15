import { Component } from '@angular/core';
import { UsuarioAutenticado } from '../../../core/models/login/login.model';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  standalone: false
})
export class Navbar {

  usuario: UsuarioAutenticado | null = null;
  isAdmin = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.usuario$.subscribe(user => {
      this.usuario = user;
      this.isAdmin = this.authService.hasRole('Admin');
    });
  }

  logout() {
    this.authService.logout();
  }


}
