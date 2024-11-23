import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent, TextColorDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { DocsCalloutComponent } from '@docs-components/public-api';
import { NgxMaskDirective } from 'ngx-mask';
import { Endereco } from 'src/app/models/endereco';
import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/services/paciente.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-pacientedetails',
  standalone: true,
  imports: [CommonModule,IconDirective, RowComponent, ColComponent, DocsCalloutComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ButtonDirective, FormsModule],
  templateUrl: './pacientedetails.component.html',
  styleUrl: './pacientedetails.component.scss'
})
export class PacientedetailsComponent {
  @Input("paciente") paciente: Paciente = new Paciente(null!,'','',new Date(), '', new Endereco() )
  @Output("retorno") retorno = new EventEmitter<any>(); 
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  pacienteService = inject(PacienteService);



  constructor(private http: HttpClient){
    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }
  }

  formatarCep() {
    if (this.paciente.endereco.cep) {
      this.paciente.endereco.cep = this.paciente.endereco.cep.replace(/\D/g, '');
      this.paciente.endereco.cep = this.paciente.endereco.cep.replace(/(\d{5})(\d)/, '$1-$2');
    }
  }
  formatarTelefone() {
    if (this.paciente.telefone) {
      this.paciente.telefone = this.paciente.telefone.replace(/\D/g, '');
      this.paciente.telefone = this.paciente.telefone.replace(/^(\d{2})(\d)/g, '+$1 $2');
      this.paciente.telefone = this.paciente.telefone.replace(/(\d{2})(\d{5})(\d{4})/, '$1 $2-$3');
    }
  }

  findById(id: number){
    this.pacienteService.findById(id).subscribe({
      next: (retorno: Paciente)  => {
        this.paciente = retorno;
        if (!this.paciente.endereco) {
                this.paciente.endereco = new Endereco();
            }
      },
      error: (error: any) => { 
        Swal.fire({
          title: 'Error!',
          text: 'Erro ao recuperar Paciente',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      },
    });
  }

  save(){
    if (this.paciente.id > 0){

      this.pacienteService.update(this.paciente, this.paciente.id).subscribe({
        next: (retorno: Paciente)  => {
          Swal.fire({
            title: "PACIENTE ATUALIZADO COM SUCESSO",
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.retorno.emit(this.paciente);
          this.paciente = retorno;
        },
        error: (error: any) => { 
          Swal.fire({
            title: 'Error!',
            text: 'Erro ao atualizar Paciente!',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        },
      });
    }else{
      this.pacienteService.save(this.paciente).subscribe({
        next: (retorno: Paciente)  => { 
          Swal.fire({
            title: "PACIENTE SALVO COM SUCESSO",
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['pacientes'], { state: { pacienteEditado: this.paciente } });
          this.retorno.emit(this.paciente);
          this.paciente = retorno;
        },
        error: (error: any) => {
          Swal.fire({
            title: 'Error!',
            text: 'Erro ao Salvar Paciente!',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        },
      });  
    }
  }
  
  buscarEndereco() {
    const cep = this.paciente.endereco.cep;
    if (cep) {
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe(
        (dados: any) => {
          if (!dados.erro) {
            this.paciente.endereco.nomeRua = dados.logradouro;
            this.paciente.endereco.bairro = dados.bairro;
            this.paciente.endereco.cidade = dados.localidade;
            this.paciente.endereco.estado = dados.uf;
          } else {
            console.error('CEP não encontrado');
          }
        },
        (error) => {
          console.error('Erro ao buscar endereço', error);
        }
      );
    }
  }
}
