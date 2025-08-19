import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.initialize();
  }

}
