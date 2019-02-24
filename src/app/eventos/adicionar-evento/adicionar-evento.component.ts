import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Router } from "@angular/router";

import { Observable, fromEvent, merge } from 'rxjs';

import { ToastrService} from 'ngx-toastr';

import { Evento, Endereco, Categoria } from "../models/evento";
import { EventoService } from '../services/evento.service';
import { GenericValidator } from 'src/app/utils/genericValidator';

@Component({
  selector: 'app-adicionar-evento',
  templateUrl: './adicionar-evento.component.html'
})

export class AdicionarEventoComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  public errors: any[] = [];
  public eventoForm: FormGroup;
  public evento: Evento;
  public categorias: Categoria[];
  public gratuito: boolean;
  public online: boolean;

  public displayMessage: {[key: string]: string} = {};
  private validationMessages: {[key: string]: {[key: string]: string}};
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private eventoService: EventoService) {

    this.validationMessages = {
      nome: {
        required: 'O Nome é requerido.',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      },
      dataInicio: {
        required: 'Informe a data de início'
      },
      dataFim: {
        required: 'Informe a data de encerramento'
      },
      categoriaId: {
        required: 'Informe a categoria'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.evento = new Evento();
    this.evento.endereco = new Endereco();
  } 

  ngOnInit(): void {
    this.eventoForm = this.fb.group({
      nome: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(150)]],
      categoriaId: ['', Validators.required],
      descricaoCurta: '',
      descricaoLonga: '',
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
      gratuito: '',
      valor: '0',
      online: '',
      nomeEmpresa: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cep: '',
      cidade: '',
      estado: '',
    });
    
    this.eventoService.obterCategorias()
      .subscribe(
        categorias => this.categorias = categorias,
        fail => this.errors = fail.erro.errors
      );
  }

  ngAfterViewInit(): void {
      let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.eventoForm);
    });
  }

  adicionarEvento() {
    if (this.eventoForm.dirty && this.eventoForm.valid) {
      let e = Object.assign({}, this.evento, this.eventoForm.value);
      let user = JSON.parse(this.eventoService.getUser());

      e.organizadorId = user.id;
      
      e.endereco.logradouro = e.logradouro;
      e.endereco.numero = e.numero;
      e.endereco.complemento = e.complemento;
      e.endereco.bairro = e.bairro;
      e.endereco.cep = e.cep;
      e.endereco.cidade = e.cidade;
      e.endereco.estado = e.estado;

      this.eventoService.registrarEvento(e)
        .subscribe(
          result => {this.onSaveComplete()},
          fail => { this.onError(fail) }
        )
    }
  }

  onError(fail) {
    this.toastr.error('Ocorreu um erro no processamento', 'Ops! :(');
    this.errors = fail.error.errors;
  }

  onSaveComplete() {

    this.eventoForm.reset();
    this.errors = [];

    const toast = this.toastr.success('Evento Registrado com Sucesso!', 'Oba :D');
    if(toast) {
      toast.onHidden.subscribe( () => {
        this.router.navigate(['/meus-eventos']);
      })
    }
  }
}
