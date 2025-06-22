import { CommonModule } from '@angular/common';
import { Component, inject, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, ModalModule, RowComponent, TextColorDirective } from '@coreui/angular';
import type { AuditReport } from 'src/app/models/audit-report';
import { AuditService } from 'src/app/services/audit.service';


@Component({
  selector: 'app-auditlist',
  standalone: true,
  imports: [ RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ButtonDirective, ModalModule, CommonModule, FormsModule],
  templateUrl: './auditlist.component.html',
  styleUrl: './auditlist.component.scss'
})
export class AuditlistComponent implements OnInit {

  listaOriginal: AuditReport[] = [];
  lista: AuditReport[] = [];

  searchTerm: string = '';
  dataInicio: string = '';
  dataFim: string = '';

  constructor(private auditService: AuditService) {}

  ngOnInit(): void {
    this.auditService.getAuditReport().subscribe(data => {
      this.listaOriginal = data;
      this.lista = data;
    });
  }

  filtrar(): void {
    this.lista = this.listaOriginal.filter(item => {
      const termo = this.searchTerm.toLowerCase();

      const matchTexto =
        item.nome?.toLowerCase().includes(termo) ||
        item.email?.toLowerCase().includes(termo) ||
        item.telefone?.toLowerCase().includes(termo);

      const dataCriacao = new Date(item.dataCriacao);
      const dataInicio = this.dataInicio ? new Date(this.dataInicio) : null;
      const dataFim = this.dataFim ? new Date(this.dataFim) : null;

      const matchData =
        (!dataInicio || dataCriacao >= dataInicio) &&
        (!dataFim || dataCriacao <= dataFim);

      return matchTexto && matchData;
    });
  }

  limparFiltros(): void {
    this.searchTerm = '';
    this.dataInicio = '';
    this.dataFim = '';
    this.lista = this.listaOriginal;
  }
}
