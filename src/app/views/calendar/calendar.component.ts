import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CriarConsultaDialogComponent } from './criar-consulta-dialog/criar-consulta-dialog.component';
import { EditarConsultaDialogComponent } from './editar-consulta-dialog/editar-consulta-dialog.component';
import { ConsultaService } from '../../services/consulta.service';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, ModalModule, RowComponent, TextColorDirective } from '@coreui/angular';
import { DocsCalloutComponent } from '@docs-components/public-api';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FullCalendarModule,
    MatDialogModule,
    RowComponent,
    ColComponent,
    DocsCalloutComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ButtonDirective, ModalModule,
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  consultaService = inject(ConsultaService);
  dialog = inject(MatDialog);

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay',
    },
    locale: 'pt-br',
    buttonText: {
      today: 'Hoje',
      month: 'Mês',
      week: 'Semana',
      day: 'Dia',
    },

    dateClick: (info) => this.handleDateClick(info),
    eventClick: (info) => this.handleEventClick(info),
    events: [],

    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: true 
    },
  };

  loadConsultas() {
    this.consultaService.findAll().subscribe((consultas) => {
      this.calendarOptions = {
        ...this.calendarOptions,
        events: consultas.map((consulta) => {
          const dataAgendamento = new Date(consulta.dataAgendamento);
            const [horaInicioHoras, horaInicioMinutos, horaInicioSegundos] = consulta.horaDeInicio.split(':').map(Number);
          const start = new Date(dataAgendamento);
          start.setHours(horaInicioHoras, horaInicioMinutos, horaInicioSegundos || 0);

          const [horaFimHoras, horaFimMinutos, horaFimSegundos] = consulta.horaDoFim.split(':').map(Number);
          const end = new Date(dataAgendamento);
          end.setHours(horaFimHoras, horaFimMinutos, horaFimSegundos || 0);

          return {
            title: consulta.descricao,
            start: start,
            end: end,
            extendedProps: {
              consultaData: consulta,
            },
          };
        }),
      };
    });
  }

  ngOnInit() {
    this.loadConsultas()
  }

  handleDateClick(info: any) {
    const dataSelecionada = info.date;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dataSelecionada < today) {
      alert('Não é possível criar consultas em datas passadas.');
    } else {
      const dialogRef = this.dialog.open(CriarConsultaDialogComponent, {
        data: {
          start: dataSelecionada,
        },
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          this.loadConsultas()
        }
      });
    }
  }
  
  
  handleEventClick(info: any) {
    const event = info.event;
    const consulta = event.extendedProps.consultaData;
  
    const editDialog = this.dialog.open(EditarConsultaDialogComponent, {
      data: consulta,
    });

    editDialog.afterClosed().subscribe((consulta: any) => {
      if (consulta) {
        this.loadConsultas()
      }
    });
  }
  

  adicionarConsultaAoCalendario(consulta: any) {
    const start = new Date(consulta.dataAgendamento);
    const end = new Date(consulta.dataAgendamento);
  
    const newEvent = {
      title: consulta.descricao,
      start: start,
      end: end,
      extendedProps: {
        consultaData: consulta,
      },
    };
    
    this.calendarOptions = {
      ...this.calendarOptions,
      events: [ ...(this.calendarOptions.events as any[]), newEvent ],
    };
  }
  
}
