import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { ChangePassword } from './change-password/change-password';
import { AuthGuard } from '../core/guard/auth.guard';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
  path: 'change-password',
  component: ChangePassword,
  canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
