import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Logindto } from '../models/usuariodtos/logindto';
import { TokenResponse } from '../models/token-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject(HttpClient);
  private API = 'http://localhost:8080/api/login';

  login(loginData: Logindto): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.API, loginData);
  }

  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
