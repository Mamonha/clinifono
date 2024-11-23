import { inject, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Usuariodto } from '../models/usuariodtos/usuariodto';
import { Responseusuariodto } from '../models/usuariodtos/responseusuariodto';
import { Logindto } from '../models/usuariodtos/logindto';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  
  http = inject(HttpClient);

  API = "http://4.228.61.72:8081/api/usuarios";

  constructor() {}


  findAll(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.API+"/findall");
  }

  findById(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(this.API+"/findbyid/"+ id);
  }

  save(usuario: Usuariodto): Observable<Usuariodto> {
    return this.http.post<Usuariodto>(`${this.API}/save`, usuario);
  }

  update(usuario: Usuario, id: number): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API}/update/${id}`, usuario);
  }

  //TODO
  updateSenha(usuario: Usuario): Observable<void> {
    return this.http.put<void>(this.API+"/senha/" + usuario.id, usuario, {responseType: 'text' as 'json'});
  }

  
  
}
