import { Routes } from '@angular/router';
import { PacientelistComponent} from './pacientelist/pacientelist.component'

export const routes: Routes = [
  {
    path: '',
    component: PacientelistComponent,
    data: {
      title:"Pacientes"
    }
  }
];
