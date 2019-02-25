import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";

import { Subscription } from 'rxjs';

import { Evento } from 'src/app/eventos/models/evento';
import { EventoService } from 'src/app/eventos/services/evento.service';

@Component({
  selector: 'app-detalhes-evento',
  templateUrl: './detalhes-evento.component.html'
})
export class DetalhesEventoComponent {

  public sub: Subscription;
  public eventoId: string = "";
  public evento: Evento;
  public enderecoMap: any;
  isDataAvailable: boolean = false;

  constructor(private eventoService: EventoService,
    private routeAc: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer) { 

      this.sub = this.routeAc.params.subscribe(
        params => {
          this.eventoId = params['id'];
        });

        this.eventoService.obterEvento(this.eventoId)
        .subscribe(
        evento => {
          this.evento = evento;

          if(!this.evento.online){
            this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q=" + this.EnderecoCompleto() + "&key=AIzaSyAP0WKpL7uTRHGKWyakgQXbW6FUhrrA5pE");
          }

          this.isDataAvailable = true;
        });    
    }

    public EnderecoCompleto(): string {
      return this.evento.endereco.logradouro + ", " + this.evento.endereco.numero + " - " + this.evento.endereco.bairro + ", " + this.evento.endereco.cidade + " - " + this.evento.endereco.estado;
    }
}
