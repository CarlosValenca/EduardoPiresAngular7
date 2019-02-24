import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

// Esta classe existe apenas para ser herdada
export abstract class ServiceBase
{
    protected UrlServiceV1: string = "https://localhost:44391/api/v1/";

    // Estou informando meu Back End que estou conversando em Json
    protected ObterHeaderJson() {
        return {
            headers: new HttpHeaders ({
                'Content-Type': 'application/json'
            })
        };
    }

    // Estou informando meu Back End que estou conversando em Json e passando o Token, pode ser usado para
    // incluir pontualmente o Token junto da requisição http ao back end
    protected ObterHeaderJsonToken() {
        return {
            headers: new HttpHeaders ({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + this.getUserToken()
            })
        };
    }

    protected extractedData(response: any) {        
        // Retorne o nó data do serviço criado e registrado no Swagger, se vc executar
        // os métodos verá que sempre tem um nó data existente com os seus dados
        return response.data || {};
    }

    // Do response que eu irei extrair o resultado do erro registrado pelo Back End
    // Se meu erro não for um response eu vou tratar ele como qualquer coisa (any)
    protected serviceError(error: Response | any) {
        let errMsg: string;
        
        if (error instanceof(Response)) {
            errMsg = `${error.status} - ${error.statusText || ''}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }

        console.error(error);
        return throwError(error);
    }

    // Estou guardando o token e o usuário dentro de um local storage que fica dentro do browser
    public setLocalStorage(token: string, user: string) {
        localStorage.setItem('eio.token', token);
        localStorage.setItem('eio.user', user);
    }

    public getUserToken(): string {
        return localStorage.getItem('eio.token');
    }

    public getUser(): string {
        return localStorage.getItem('eio.user');
    }

    public removerUserToken() {
        localStorage.removeItem('eio.token');
        localStorage.removeItem('eio.user');
    }

    public isAuthenticated() : boolean {
        let token = this.getUserToken();

        return token !== null;
    }
}