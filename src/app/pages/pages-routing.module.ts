import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { RoleGuard } from '../core/guard/role.guard';

const routes: Routes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: '',
        redirectTo: 'pedido',
        pathMatch: 'full'
      },
      {
        path: 'pedido',
        loadChildren: () =>
          import('../pages/home/pedido/pedido-module').then(
            m => m.PedidoModule
          )
      },
      {
        path: 'cliente',
        loadChildren: () =>
          import('../pages/home/cliente/cliente-module').then(
            m => m.ClienteModule
          )
      },
     {
  path: 'admin',
  loadChildren: () =>
    import('../pages/home/admin/admin-module').then(m => m.AdminModule),
  canActivate: [RoleGuard],
  data: { roles: ['Administrador'] }
}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
