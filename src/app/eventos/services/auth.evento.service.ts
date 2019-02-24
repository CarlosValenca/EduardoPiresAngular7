import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { OrganizadorService } from 'src/app/services/organizador.service';

// Autorizador de entrada nas rotas de EventSource
@Injectable()
// O CanActivate diz se você pode ou não ativar uma rota
export class EventoAuthService implements CanActivate {
    constructor(private organizadorService: OrganizadorService,
                private router: Router) {}
    
    canActivate(routeAc: ActivatedRouteSnapshot): boolean {
        if(!this.organizadorService.isAuthenticated()) {
            this.router.navigate(['/entrar']);
        }

        // Estou pegando e validando as claims do usuario logado aqui
        let claim: any = routeAc.data[0];
        if(claim!==undefined) {
            let claim = routeAc.data[0]['claim'];
            if(claim){
                let user = JSON.parse(this.organizadorService.getUser());

                if(!user.claims) {
                    this.router.navigate(['/acesso-negado']);
                }

                // Estou buscando nas claims do usuario uma claim especifica usando uma expressao lambda
                let userClaims = user.claims.some(x => x.type === claim.nome && x.value === claim.valor);
                if(!userClaims){
                    this.router.navigate(['/acesso-negado']);
                }
            }
        }
        return true;
    }

}