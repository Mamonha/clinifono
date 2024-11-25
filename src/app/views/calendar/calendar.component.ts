import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}
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
      meridiem: true, 
    },
    dayCellDidMount: (cellInfo) => {
      const today = new Date().setHours(0, 0, 0, 0);
      const cellDate = cellInfo.date.getTime();

      if(cellDate < today){
        cellInfo.el.style.backgroundColor = '#ffcccc';
        cellInfo.el.style.opacity = '0.6';
      }
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

          let color = '';
          let translatedStatus = '';
          switch (consulta.status) {
            case 'CONFIRMED':
              color = 'blue';
              translatedStatus = 'Confirmada';
              break;
            case 'PENDING':
              color = 'yellow';
              translatedStatus = 'Pendente';
              break;
            case 'CANCELLED':
              color = 'gray';
              translatedStatus = 'Cancelada';
              break;
            default:
              color = 'black';
              translatedStatus = 'Desconhecido';
              break;
          }
          return {
            title: consulta.descricao,
            start: start,
            end: end,
            backgroundColor: color,
            textColor: 'white',
            extendedProps: {
              consultaData: consulta,
              translatedStatus: translatedStatus,
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
  
    const translatedStatus = event.extendedProps.translatedStatus;
    const editDialog = this.dialog.open(EditarConsultaDialogComponent, {
      data: consulta,
      statusTraduzido: translatedStatus,
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
