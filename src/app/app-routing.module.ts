import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { NotFound } from './components/not-found/not-found';
import { NotAproved } from './components/not-aproved/not-aproved';
import { AccessDenied } from './components/access-denied/access-denied';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.module').then(m => m.AuthModule)
  },
  { path: 'not-approved', component: NotAproved },
  { path: 'access-denied', component: AccessDenied },
  {
    path: 'not-found',
    component: NotFound
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
