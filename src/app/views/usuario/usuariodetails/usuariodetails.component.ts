import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, ModalModule, RowComponent, TextColorDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { DocsCalloutComponent } from '@docs-components/public-api';
import { Usuario } from 'src/app/models/usuario';
import { Usuariodto } from 'src/app/models/usuariodtos/usuariodto';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuariodetails',
  standalone: true,
  imports: [IconDirective, RowComponent, ColComponent, DocsCalloutComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ButtonDirective, ModalModule, FormsModule, CommonModule],
  templateUrl: './usuariodetails.component.html',
  styleUrl: './usuariodetails.component.scss'
})
export class UsuariodetailsComponent {
  @Input("usuario") usuario: Usuario = { id: 0, nome: '', email: '', telefone: '', senha: '' };
  @Output("retorno") retorno = new EventEmitter<any>(); 
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  usuarioService = inject(UsuarioService);
  lista:number[]=[1,2,3,4,5]
  usuariodto = new Usuariodto();
  senhaVisivel: boolean = false;


  ngOnChanges(changes: SimpleChanges) {
    if (changes['usuario'] && changes['usuario'].currentValue) {
      this.usuariodto = { ...this.usuario, senha: this.usuario.senha || '' };
    }
  }
  constructor(private http: HttpClient){
    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }
  }
  toggleSenhaVisivel(): void {
    this.senhaVisivel = !this.senhaVisivel;
  }

  formatarTelefone() {
    if (this.usuario && this.usuario.telefone) {
      this.usuario.telefone = this.usuario.telefone.replace(/\D/g, '');
      this.usuario.telefone = this.usuario.telefone.replace(/^(\d{2})(\d)/g, '+$1 $2');
      this.usuario.telefone = this.usuario.telefone.replace(/(\d{2})(\d{5})(\d{4})/, '$1 $2-$3');
    }
  }

  findById(id: number){
    this.usuarioService.findById(id).subscribe({
      next: (retorno: Usuario)  => {
        this.usuario = retorno;
      },
      error: (error: any) => { 
        Swal.fire({
          title: 'Error!',
          text: 'Erro ao recuperar Usuario',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      },
    });
  }

  save() {
    if (this.usuario.id > 0) {
      this.usuario = { ...this.usuariodto };
        this.usuarioService.update(this.usuario, this.usuario.id).subscribe({
            next: (retorno: Usuario) => {
                Swal.fire({
                    title: "USUARIO ATUALIZADO COM SUCESSO",
                    icon: 'success',
                    confirmButtonText: 'Ok',
                });
                this.retorno.emit(this.usuario);
                this.usuario = retorno;
            },
            error: (error: any) => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Erro ao atualizar Usuario!',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                });
            },
        });
    } else {
        this.usuarioService.save(this.usuariodto).subscribe({
            next: (retorno: Usuariodto) => {
                Swal.fire({
                    title: "Usuario SALVO COM SUCESSO",
                    icon: 'success',
                    confirmButtonText: 'Ok',
                });
                this.router2.navigate(['Usuarios'], { state: { UsuarioEditado: this.usuario } });
                this.retorno.emit(this.usuario);
                this.usuario = retorno as Usuario;
            },
            error: (error: any) => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Erro ao Salvar Usuario!',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                });
            },
        });
    }
  }
}
