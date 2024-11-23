import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta';
import { Consultadashboarddto } from '../models/reportsdtos/consultadashboarddto';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  http = inject(HttpClient);

  API = "http://4.228.61.72:8081/api/consulta";

  
  constructor() { }

  findAll(): Observable<Consulta[]>{
    return this.http.get<Consulta[]>(this.API+"/findall");
  }

  totalpormes(): Observable<number[]>{
    return this.http.get<number[]>(this.API+"/totalpormes");
  }

  findById(id: number): Observable<Consulta>{
    return this.http.get<Consulta>(this.API+"/findbyid/"+ id);
  }

  save(consulta: Consulta): Observable<Consulta>{
    return this.http.post<Consulta>(this.API+"/create", consulta, {responseType: 'text' as 'json'});
  }

  update(consulta: Consulta, id: number): Observable<Consulta>{
    return this.http.put<Consulta>(this.API + "/update/" + id, consulta, {responseType: 'text' as 'json'});
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(this.API + "/delete" + id);
  }

  confirmar(id: number, consulta: Consulta): Observable<Consulta>{
    return this.http.put<Consulta>(this.API + "/confirmar/" + id, consulta, {responseType: 'text' as 'json'});
  }

  
  dashboard(): Observable<Consultadashboarddto>{
    return this.http.get<Consultadashboarddto>(this.API + "/dashboard")
  }
}
