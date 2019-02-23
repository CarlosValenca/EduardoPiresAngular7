import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { OrganizadorService } from 'src/app/services/organizador.service';

// Autorizador de entrada nas rotas de EventSource
@Injectable()
// O CanActivate diz se você pode ou não ativar uma rota
export class EventoAuthService implements CanActivate {
    constructor(private organizadorService: OrganizadorService) {}
    
    canActivate(routeAc: ActivatedRouteSnapshot): boolean {
        return this.organizadorService.isAuthenticated();
    }

}