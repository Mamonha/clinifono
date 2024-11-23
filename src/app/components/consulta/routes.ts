import { Routes } from '@angular/router';
import { ConsultalistComponent } from './consultalist/consultalist.component';
import { ConsultadetailsComponent } from './consultadetails/consultadetails.component';

export const routes: Routes = [
  {
    path: 'conslta',
    component: ConsultalistComponent,
    data: {
      title: 'Lista de Consulta'
    }
  },
  {
    path: 'consulta/new',
    component: ConsultadetailsComponent,
    data: {
      title: 'Nova Consulta'
    }
  },
  {
    path: 'consulta/edit/:id',
    component: ConsultadetailsComponent,
    data: {
      title: 'Editar Consulta'
    }
  }
];
