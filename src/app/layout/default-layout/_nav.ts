import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Consultorio'
  },
  {
    name: 'Pacientes',
    url: '/pacientes',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Agendamentos',
    url: '/calendar',
    // linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Configuraçoes de Usuario',
    title: true
  },
  {
    name: 'Usuarios',
    url: '/usuario',
    iconComponent: { name: 'cil-user' },
    children: [
      {
        name: 'Cadastrar',
        url: '/usuario/new',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Editar/Removar',
        url: '/usuario',
        icon: 'nav-icon-bullet'
      },
    ]
  },
];
