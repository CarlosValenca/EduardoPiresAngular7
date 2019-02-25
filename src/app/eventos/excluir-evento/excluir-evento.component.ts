import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControlName } from "@angular/forms";

import { Subscription } from "rxjs";
import { ToastrService } from 'ngx-toastr';

import { Evento } from "../models/evento";
import { EventoService } from "../services/evento.service";

@Component({
  selector: 'app-excluir-evento',
  templateUrl: './excluir-evento.component.html'
})
export class ExcluirEventoComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public sub: Subscription;
  public eventoId: string = "";
  public evento: Evento;
  isDataAvailable: boolean = false;

  constructor(private eventoService: EventoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        this.eventoId = params['id'];
      });

    this.eventoService.obterMeuEvento(this.eventoId)
      .subscribe(
        evento => {
        this.evento = evento;
          this.isDataAvailable = true;
        }
      );
  }

  excluirEvento() {
    this.eventoService.excluirEvento(this.eventoId)
      .subscribe(
        evento => { this.onDeleteComplete(evento) },
        error => { this.onError() }
      );
  }

  public onDeleteComplete(evento: any) {

    const toast = this.toastr.success('Evento excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/meus-eventos']);
      });
    }
  }

  public onError() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
