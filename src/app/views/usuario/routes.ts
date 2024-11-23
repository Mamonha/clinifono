import { Routes } from '@angular/router';
import { UsuariolistComponent } from './usuariolist/usuariolist.component';
import { UsuariodetailsComponent } from './usuariodetails/usuariodetails.component';

export const routes: Routes = [{
  path: '',
  data: {
    title: 'Usuario'
  },
  children: [{
      path: '',
      redirectTo: 'usuario',
      pathMatch: 'full'
    },
    {
      path: 'new',
      loadComponent: () => import('./usuariodetails/usuariodetails.component').then(m => m.UsuariodetailsComponent),
      data: {
        title: 'Criar Usuario'
      }
    },
    {
      path: 'edit/:id',
      loadComponent: () => import('./usuariodetails/usuariodetails.component').then(m => m.UsuariodetailsComponent),
      data:{
        title: 'Editar Usuario'
      }
    },
    {
      path: 'usuario',
      loadComponent: () => import('./usuariolist/usuariolist.component').then(m => m.UsuariolistComponent),
      data: {
        title: 'Lista de Usuario'
      }
    }
  ]
}
];
