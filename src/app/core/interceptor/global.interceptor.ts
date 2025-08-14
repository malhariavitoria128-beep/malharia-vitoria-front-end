import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiResponse } from '../models/api-response';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService, private spinner: NgxSpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();

    const token = localStorage.getItem('app_token');
    const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        let apiError = {
          success: false,
          message: 'Erro desconhecido',
          data: null,
          details: null
        };

        switch (error.status) {
          case 0: // Rede / servidor desligado
            apiError.message = 'Falha de rede ou servidor não respondeu.';
            this.toastr.error(apiError.message, 'Erro');
            break;

          case 401: // Não autorizado / token expirado
          case 403: // Proibido
            apiError.message = error.error?.message || 'Sessão expirada. Faça login novamente.';
            this.toastr.warning(apiError.message, 'Aviso');
            localStorage.removeItem('app_token');
            this.router.navigate(['/login']);
            break;

          case 500: // Erro interno
            apiError.message = error.error?.message || 'Erro interno no servidor.';
            apiError.details = error.error?.details;
            this.toastr.error(apiError.message, 'Erro');
            break;

          default: // Outros erros
            apiError.message = error.error?.message || error.error?.error || 'Ocorreu um erro inesperado.';
            this.toastr.error(apiError.message, 'Erro');
            break;
        }

        return throwError(() => apiError);
      }),
      finalize(() => this.spinner.hide())
    );
  }
}





