import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Paciente } from '../models/paciente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService  {

  http = inject(HttpClient);

  API = "http://4.228.61.72:8081/api/paciente";

  
  constructor() { }

  findAll(): Observable<Paciente[]>{
    return this.http.get<Paciente[]>(this.API+"/findall");
  }

  findById(id: number): Observable<Paciente>{
    return this.http.get<Paciente>(this.API+"/findbyid/"+ id);
  }

  save(paciente: Paciente): Observable<Paciente>{
    return this.http.post<Paciente>(this.API+"/create", paciente, {responseType: 'text' as 'json'});
  }

  totalpormes(): Observable<number[]>{
    return this.http.get<number[]>(this.API+"/totalpormes");
  }

  update(paciente: Paciente, id: number): Observable<Paciente> {
    // Extraindo apenas os campos desejados
    const pacientePayload = {
      nome: paciente.nome,
      dataDeNascimento: paciente.dataDeNascimento,
      cpf: paciente.cpf,
      telefone: paciente.telefone
    };
  
    return this.http.put<Paciente>(
      `${this.API}/update/${id}`, 
      pacientePayload, 
      { responseType: 'text' as 'json' }
    );
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(this.API + "/delete/" + id);
  }

  

}
