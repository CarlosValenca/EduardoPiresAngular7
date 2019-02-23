import { Injectable } from '@angular/core';
import { ServiceBase } from './service.base';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Organizador } from '../usuario/models/organizador';

@Injectable()
export class OrganizadorService extends ServiceBase
{
    
/**
 *
 */
constructor(private http: HttpClient) {super();}

    
    // O Observable é do tipo Organizador e vai esperar um retorno do Back End para terminar a ação no Front End
    registrarOrganizador(organizador: Organizador) : Observable<Organizador> {
        let v = this.UrlServiceV1 + 'nova-conta';
        
        return this.http
        // Você pode mudar o endpoint (UrlService) que o registro de uma nova conta não será afetado
        .post(this.UrlServiceV1 + 'nova-conta', organizador, super.ObterHeaderJson())
        .pipe(
            // Em caso de conexão bem sucedida com o back end o método
            // extractedData ira realizar a operação trazendo estes dados para o front end
            map(super.extractedData),
            catchError(super.serviceError)
        );
    }

    // O Observable é do tipo Organizador e vai esperar um retorno do Back End para terminar a ação no Front End
    login(organizador: Organizador) : Observable<Organizador> {
        
        let v = this.UrlServiceV1 + 'conta';

        return this.http
        // Você pode mudar o endpoint (UrlService) que o registro de uma nova conta não será afetado
        .post(this.UrlServiceV1 + 'conta', organizador, super.ObterHeaderJson())
        .pipe(
            // Em caso de conexão bem sucedida com o back end o método
            // extractedData ira realizar a operação trazendo estes dados para o front end
            map(super.extractedData),
            catchError(super.serviceError)
        );
    }


}