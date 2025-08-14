import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { NotAproved } from '../components/not-aproved/not-aproved';
import { AccessDenied } from '../components/access-denied/access-denied';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
