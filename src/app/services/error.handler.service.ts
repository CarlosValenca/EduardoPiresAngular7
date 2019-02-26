import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { OrganizadorService } from './organizador.service';

@Injectable()
// Intercepta a requisição e avalia se retornou algum tipo de erro no sentido de tratar estas mensagens no front
export class ErrorHandlerService implements HttpInterceptor {
    constructor(private organizadorService: OrganizadorService,
                private router: Router){}        
    
    // O intercept é utilizado aqui para interceptar os erros das requisições HTTP através das requests
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Caso o problema no request seja a falta de token eu estou interceptando o request e passando o token do usuário
        req = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + this.organizadorService.getUserToken()
            }
        });

        return next.handle(req).pipe(
            catchError(err => {
                // Não Autorizado : O servidor não conhece este usuário (token expirado, usuário não logado, etc)
                if(err.status === 401) {
                    this.organizadorService.removerUserToken();
                    this.router.navigate(['/usuario/entrar']);
                }
                // Acesso Negado : Usuários conectados sem as permissões necessárias
                if(err.status === 403) {
                    this.router.navigate(['/acesso-negado']);
                }
                // Não Informado
                if(err.status === 404) {
                    this.organizadorService.removerUserToken();
                    this.router.navigate(['/nao-encontrado']);
                }

                // Relança o erro
                return throwError(err);
            })
        );
    }

}