import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-not-aproved',
  standalone: false,
  templateUrl: './not-aproved.html',
  styleUrl: './not-aproved.css'
})
export class NotAproved {
  lottieOptions: AnimationOptions = {
    path: '/assets/not-approved.json'
  };

  animationCreated(animationItem: AnimationItem): void {
  }

}
