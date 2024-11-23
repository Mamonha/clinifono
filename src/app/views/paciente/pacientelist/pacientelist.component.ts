import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from '../../../models/paciente'
import { PacientedetailsComponent} from '../pacientedetails/pacientedetails.component'
import { PacienteService} from '../../../services/paciente.service'
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, ModalModule, RowComponent, TextColorDirective } from '@coreui/angular';
import { cilPenAlt, cilPlus, cilTrash, cilUserPlus } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { DocsCalloutComponent } from '@docs-components/public-api';
import { Endereco } from 'src/app/models/endereco';
import Swal from 'sweetalert2'
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-pacientelist',
  standalone: true,
  imports: [IconDirective, RowComponent, ColComponent, DocsCalloutComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ButtonDirective, ModalModule, PacientedetailsComponent, CommonModule],
  templateUrl: './pacientelist.component.html',
  styleUrl: './pacientelist.component.scss'
})
export class PacientelistComponent {
  icons = { cilPlus, cilUserPlus, cilPenAlt, cilTrash};
  
  lista!: Paciente[];
  pacienteEdit: Paciente= new Paciente(0,'','',new Date(), '', new Endereco());
  router=inject(Router);
  pacienteService = inject(PacienteService);
  modalVisible: boolean = false;
  paciente!: Paciente;

  // modalService = inject(MdbModalService);
  // @ViewChild("modalPacienteDetalhe") modalPacienteDetalhe!: TemplateRef<any>;
  // modalRef!: MdbModalRef<any>;




  constructor() { 
    this.findAll()    
  }


  openModal() {
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false; 
  }
  
  findAll(){
    this.pacienteService.findAll().subscribe({
      next: lista =>{
        this.lista = lista;
        console.log('Dados recebidos:', lista);
      },
      error: error => {
        Swal.fire({
          title: "Error!",
          text: "Pacientes Não encontrados",
          icon: "error",
          confirmButtonText: 'Fechar'
        })
      },
    });
  }
  
  new() {
    this.pacienteEdit = new Paciente(0, '', '', new Date(), '', new Endereco());
    this.openModal();
  }
  
  
  update(paciente: Paciente) {
    this.pacienteEdit = Object.assign({}, paciente);
    this.openModal();
  }

  retornoDetalhe(paciente: Paciente){
    this.findAll();
    this.modalVisible = false;
  }

  delete(id: number){
    Swal.fire({
      title: "Tem Certeza que gostaria de remover esse usuario?",
      icon: "warning",
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim",
      denyButtonText: "Não",
    }).then((result)=>{
      if(result.isConfirmed){

        this.pacienteService.delete(id).subscribe({
          next: (retorno: any)   => { 
            Swal.fire({
              title: 'Mensagem!',
              text: 'Deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok'
            })
            this.findAll();
          },
          error: (error: any)  => { 
            Swal.fire({
              title: 'Error!',
              text: 'Não foi Possivel deletar esse usuario!',
              icon: 'error',
              confirmButtonText: 'Cool'
            })
          },
        });
      }
    });
  }
}
