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
  private API = 'http://4.228.61.72:8081/api/login';

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
