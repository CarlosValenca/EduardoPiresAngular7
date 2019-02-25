// Coisas do Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Objetos Reativos
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Coisas Nossas
import { ServiceBase } from 'src/app/services/service.base';
import { Evento, Categoria, Endereco } from '../models/evento';

@Injectable()
export class EventoService extends ServiceBase {
    constructor(private http: HttpClient){super()}

    registrarEvento(evento: Evento): Observable<Evento> {
        return this.http
            .post(this.UrlServiceV1 + 'eventos', evento, super.ObterHeaderJson())
            .pipe(
                map(super.extractedData),
                catchError(super.serviceError)
            );
    }

    // Estou usando o [] junto de Categoria para indicar uma coleção de categorias
    // Uma observaçao importante, como neste caso temos uma coleção simples de categorias
    // estamos usando junto com o get um binding para converter o resultado em uma coleção de categorias
    obterCategorias(): Observable<Categoria[]> {
        return this.http
            .get<Categoria[]>(this.UrlServiceV1 + 'eventos/categorias')
            .pipe(
                catchError(super.serviceError)
            );
    }

    obterTodos(): Observable<Evento[]> {
        return this.http
            .get<Evento[]>(this.UrlServiceV1 + "eventos")
            .pipe(catchError(super.serviceError));
    }

    obterMeusEventos(): Observable<Evento[]> {
        return this.http
            .get<Evento[]>(this.UrlServiceV1 + "eventos/meus-eventos/", super.ObterHeaderJson())
            .pipe(
                catchError(super.serviceError)
                );
    };

    // Este método é para obter o meu evento
    obterMeuEvento(id: string): Observable<Evento> {
        return this.http
            .get<Evento>(this.UrlServiceV1 + "eventos/meus-eventos/" + id, super.ObterHeaderJson())
            .pipe(
                map(super.extractedData),
                catchError(super.serviceError)
                );
    }

    excluirEvento(id: string): Observable<Evento> {
        return this.http
            .delete<Evento>(this.UrlServiceV1 + "eventos/" + id, super.ObterHeaderJson())
            .pipe(
                map(super.extractedData),
                catchError(super.serviceError)
            );
        }


    // Este serviço é para obter qualquer evento específico independente de um organizador
    obterEvento(id: string): Observable<Evento> {
        return this.http
            .get<Evento>(this.UrlServiceV1 + "eventos/" + id)
            .pipe(
                catchError(super.serviceError)
                );
    }

    atualizarEvento(evento: Evento): Observable<Evento> {
        let response = this.http
            .put(this.UrlServiceV1 + "eventos", evento, super.ObterHeaderJson())
            .pipe(
                    map(super.extractedData),
                    catchError(super.serviceError));
        return response;
    };
  
    adicionarEndereco(endereco: Endereco): Observable<Endereco> {
        let response = this.http
            .post(this.UrlServiceV1 + "endereco", endereco, super.ObterHeaderJson())
            .pipe(
                    map(super.extractedData),
                    catchError(super.serviceError));
        return response;
    };
  
    atualizarEndereco(endereco: Endereco): Observable<Endereco> {
        let response = this.http
            .put(this.UrlServiceV1 + "endereco", endereco, super.ObterHeaderJson())
            .pipe(
                    map(super.extractedData),
                    catchError(super.serviceError));
        return response;
    };
  
}