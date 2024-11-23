import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Endereco } from '../models/endereco';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  http = inject(HttpClient);

  API = "https://localhost:8080/api/enderecos";

  
  constructor() { }

  findAll(): Observable<Endereco[]>{
    return this.http.get<Endereco[]>(this.API+"/findall");
  }

  findById(id: number): Observable<Endereco>{
    return this.http.get<Endereco>(this.API+"/findbyid/"+ id);
  }

  save(endereco: Endereco): Observable<Endereco>{
    return this.http.post<Endereco>(this.API+"/create", endereco, {responseType: 'text' as 'json'});
  }

  update(endereco: Endereco, id: number): Observable<Endereco>{
    return this.http.put<Endereco>(this.API + "/upd ate/" + id, endereco, {responseType: 'text' as 'json'});
  }
}
