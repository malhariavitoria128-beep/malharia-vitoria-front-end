import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.html',
  styleUrls: ['./not-found.css'], // corrigido plural,
  standalone: false
})
export class NotFound {
  lottieOptions: AnimationOptions = {
    path: '/assets/not-found.json' // caminho fixo desde a raiz de assets
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log('Animação carregada:', animationItem);
  }
}
