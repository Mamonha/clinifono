import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const meuhttpInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);

  // Recuperando o token diretamente como string
  const token = localStorage.getItem('token'); 

  // Se o token existir e a URL não for a de login, adicionar o token ao cabeçalho
  if (token && !router.url.includes('/login')) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      },
    });
  }

  // Executando a requisição e tratando os erros
  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 || err.status === 403) {
          alert(`Erro ${err.status} - Você não tem permissão para acessar esta página.`);
          router.navigate(['/login']);
        } else {
          console.error('Erro HTTP:', err);
        }
      } else {
        console.error('Ocorreu um erro inesperado:', err);
      }

      return throwError(() => err);
    })
  );
};