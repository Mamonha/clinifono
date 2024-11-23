import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Consulta } from '../../../models/consulta';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-visualizar-consulta-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './visualizar-consulta-dialog.component.html',
  styleUrls: ['./visualizar-consulta-dialog.component.scss'],
})
export class VisualizarConsultaDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<VisualizarConsultaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public consulta: Consulta
  ) {}
}
