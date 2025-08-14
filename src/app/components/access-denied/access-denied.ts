import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-access-denied',
  standalone: false,
  templateUrl: './access-denied.html',
  styleUrl: './access-denied.css'
})
export class AccessDenied {
    lottieOptions: AnimationOptions = {
    path: '/assets/access-denied.json' // caminho fixo desde a raiz de assets
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log('Animação carregada:', animationItem);
  }
}
