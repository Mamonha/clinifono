import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PacienteService } from '../../../services/paciente.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ConsultaService } from '../../../services/consulta.service';
import { Consulta } from '../../../models/consulta';
import { Paciente } from '../../../models/paciente';
import { Usuario } from '../../../models/usuario';
import { AppDateAdapter } from '../../../adapters/AppDateAdapter';

@Component({
  selector: 'app-criar-consulta-dialog',
  standalone: true,
  templateUrl: './criar-consulta-dialog.component.html',
  styleUrls: ['./criar-consulta-dialog.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
  ],
})

export class CriarConsultaDialogComponent implements OnInit {
  consultaForm: FormGroup;
  pacientes: Paciente[] = [];
  usuarios: Usuario[] = [];
  isCancelled: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CriarConsultaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private pacienteService : PacienteService,
    private usuarioService : UsuarioService,
    private consultaService : ConsultaService
  ) {
    this.consultaForm = new FormGroup({
      descricao: new FormControl('', Validators.required),
      data_agendamento: new FormControl(this.data.start, Validators.required),
      hora_de_inicio: new FormControl('', Validators.required),
      hora_do_fim: new FormControl('', Validators.required),
      status: new FormControl('PENDING', Validators.nullValidator),
      paciente_id: new FormControl('', Validators.required),
      usuario_id: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.pacienteService.findAll().subscribe(data => this.pacientes = data)
    this.usuarioService.findAll().subscribe(data => this.usuarios = data)
  }

  onSubmit() {
    if (this.isCancelled) {
      this.dialogRef.close(); 
      return; 
    }
    if (this.consultaForm.valid) {
      console.log(this.consultaForm);
      const formData = this.consultaForm.value;
      const paciente: Paciente = { id: Number(formData.paciente_id) } as Paciente;
      const usuario: Usuario = { id: Number(formData.usuario_id) } as Usuario;
      const horaDeInicio = formData.hora_de_inicio + ':00';
      const horaDoFim = formData.hora_do_fim + ':00';
  
      const consulta: Consulta = {
        descricao: formData.descricao,
        dataAgendamento: formData.data_agendamento,
        horaDeInicio: horaDeInicio,
        horaDoFim: horaDoFim,
        status: 'PENDING',
        paciente: paciente,
        usuario: usuario,
      };
      console.log('Consulta a ser salva:', consulta);
  
      this.consultaService.save(consulta).subscribe({
        next: (response) => {
          this.snackBar.open('Consulta criada com sucesso!', 'Fechar', {
            duration: 3000,
          });
          this.dialogRef.close(consulta);
        },
        error: (error) => {
          this.snackBar.open('Erro ao criar consulta.', 'Fechar', {
            duration: 3000,
          });
          console.error('Erro ao salvar consulta:', error);
        }
      });
    } else {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', {
        duration: 3000,
      });
    }
  }
  onCancel(): void {
    this.isCancelled = true; 
    this.dialogRef.close(); 
  }
}
