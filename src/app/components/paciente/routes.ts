import { Routes } from '@angular/router';
import { PacientelistComponent } from './pacientelist/pacientelist.component';
import { PacientedetailsComponent } from './pacientedetails/pacientedetails.component';

export const routes: Routes = [
  {
    path: 'paciente',
    component: PacientelistComponent,
    data: {
      title: 'Lista de Pacientes'
    }
  },
  {
    path: 'paciente/new',
    component: PacientedetailsComponent,
    data: {
      title: 'Novo Paciente'
    }
  },
  {
    path: 'paciente/edit/:id',
    component: PacientedetailsComponent,
    data: {
      title: 'Editar Paciente'
    }
  }
];
