import { Component, OnInit } from '@angular/core';
import { EventoService } from '../services/evento.service';
import { Evento } from '../models/evento';


@Component({
  selector: 'app-meus-eventos',
  templateUrl: './meus-eventos.component.html'
})
export class MeusEventosComponent implements OnInit {

  public eventos: Evento[];
  errorMessage: string;

  constructor(private eventoService: EventoService) { }

  ngOnInit() {
    this.eventoService.obterMeusEventos()
    .subscribe(
      eventos => this.eventos = eventos,
      error => this.errorMessage = error
    );
  }

}
