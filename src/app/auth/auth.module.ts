import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login/login';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccessDenied } from '../components/access-denied/access-denied';
import { NotAproved } from '../components/not-aproved/not-aproved';
import { Register } from './register/register';
import { provideLottieOptions, LottieComponent } from 'ngx-lottie';
import player from 'lottie-web';
import { ChangePassword } from './change-password/change-password';


@NgModule({
  declarations: [
    Login,

    Register,
    ChangePassword


  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
   LottieComponent

  ],
    providers: [

     provideLottieOptions({
      player: () => player // usando import direto
    })

  ],
})
export class AuthModule { }
