import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, ModalModule, RowComponent, TextColorDirective } from '@coreui/angular';
import { cilPenAlt, cilPlus, cilTrash, cilUserPlus } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { DocsCalloutComponent } from '@docs-components/public-api';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { UsuariodetailsComponent } from '../usuariodetails/usuariodetails.component';

@Component({
  selector: 'app-usuariolist',
  standalone: true,
  imports: [IconDirective, RowComponent, ColComponent, DocsCalloutComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ButtonDirective, ModalModule, CommonModule, UsuariodetailsComponent],
  templateUrl: './usuariolist.component.html',
  styleUrl: './usuariolist.component.scss'
})
export class UsuariolistComponent {
  icons = { cilPlus, cilUserPlus, cilPenAlt, cilTrash};

  lista!: Usuario[];
  usuarioEdit: Usuario= new Usuario(0,'','','');
  router=inject(Router);
  UsuarioService = inject(UsuarioService);
  modalVisible: boolean = false;
  usuario!: Usuario;

  constructor() { 
    this.findAll()    
  }

  new() {
    this.usuarioEdit = new Usuario(0, '', '','');
    this.openModal();
  }

  handleVisibleChange(visible: boolean) {
    this.modalVisible = visible;
  }
  openModal() {
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false; 
  }

  findAll(){
    this.UsuarioService.findAll().subscribe({
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

  update(usuario: Usuario) {
    console.log("usuario recebido: " + usuario.nome)
    this.usuarioEdit = Object.assign({}, usuario);
    console.log("usuarioedit: " + this.usuarioEdit.nome);
    this.openModal();

  }

  retornoDetalhe(usuario: Usuario){
    this.findAll();
    this.modalVisible = false;
  }
}
