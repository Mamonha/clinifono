import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableDirective } from '@coreui/angular';
import { Consulta } from 'src/app/models/consulta';
import { ConsultaService } from 'src/app/services/consulta.service';



@Component({
  selector: 'app-consultalist',
  standalone: true,
  imports: [TableDirective, CommonModule],
  templateUrl: './consultalist.component.html',
  styleUrl: './consultalist.component.scss'
})



export class ConsultalistComponent {


  users: Consulta[] = [];
user: any;

  constructor(private consultaService: ConsultaService) {}

  ngOnInit(): void {
    this.loadAgendamentos();
  }

  loadAgendamentos() {
    this.consultaService.findAll().subscribe({
      next: (data) => {
        this.users = data.sort((a, b) => new Date(a.dataAgendamento).getTime() - new Date(b.dataAgendamento).getTime());
      },
      error: (error) => {
        console.error('Erro ao carregar agendamentos:', error);
      }
    });
  }
}
