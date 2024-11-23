import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { Logindto } from 'src/app/models/usuariodtos/logindto';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle, ReactiveFormsModule]
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: Logindto = {
        email: this.loginForm.get('email')?.value,
        senha: this.loginForm.get('password')?.value
      };
  
      this.loginService.login(loginData).subscribe({
        next: response => { 
          if(response && response.token){
            const token = response.token;
            this.loginService.addToken(token);
            this.router.navigate(['/admin/dashboard']);
          } else {
            alert('Login falhou. Verifique suas credenciais.');
          }
        
        },
        error: error => {
          console.error('Erro de login:', error);
        }
      });
    } else {
      console.log('Formulário inválido:', this.loginForm); 
    }
  }

}
