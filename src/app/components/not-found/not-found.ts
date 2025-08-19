import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.html',
  styleUrls: ['./not-found.css'],
  standalone: false
})
export class NotFound {
  lottieOptions: AnimationOptions = {
    path: '/assets/not-found.json'
  };

  animationCreated(animationItem: AnimationItem): void {
  }
}
