import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { Observable, fromEvent, merge, Subscription } from 'rxjs';

import { ToastrService} from 'ngx-toastr';

import { Evento, Endereco, Categoria } from "../models/evento";
import { EventoService } from '../services/evento.service';
import { GenericValidator } from 'src/app/utils/genericValidator';
import { DateUtils } from 'src/app/utils/date.type';
import { CurrencyUtils } from 'src/app/utils/currency.type';

@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.component.html'
})

export class EditarEventoComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  public myDatePickerOptions = DateUtils.getMyDatePickerOptions();
  
  public errors: any[] = [];
  public errorsEndereco: any[] = [];
  public eventoForm: FormGroup;
  public enderecoForm: FormGroup;
  public evento: Evento;
  public endereco: Endereco;
  public categorias: Categoria[];
  public eventoId: string = "";
  
  public gratuito: boolean;
  public online: boolean;
  public sub: Subscription;
  public modalVisible: boolean;
  isDataAvailable: boolean = false;

  public displayMessage: {[key: string]: string} = {};
  private validationMessages: {[key: string]: {[key: string]: string}};
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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
    this.modalVisible = false;
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
      nomeEmpresa: ''
    });

    this.enderecoForm = this.fb.group({
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cep: '',
      cidade: '',
      estado: ''
    });

    this.eventoService.obterCategorias()
      .subscribe(
        categorias => this.categorias = categorias,
        fail => this.errors = fail.erro.errors
      );

      this.sub = this.route.params.subscribe(
        params => {
          this.eventoId = params['id'];
          this.obterEvento(this.eventoId);
        }
      )
  }

  ngAfterViewInit(): void {
      let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.eventoForm);
    });
  }

  obterEvento(id: string) {
    this.eventoService.obterMeuEvento(id)
    .subscribe(
      evento => { this.preencherFormEvento(evento),
                  this.isDataAvailable = true; }
        )
      };

    preencherFormEvento(evento: Evento): void {
      this.evento = evento;
  
      let valorBrl = CurrencyUtils.ToPrice(this.evento.valor);

      this.online = this.evento.online;
      this.gratuito = this.evento.gratuito;
  
      // O patchValue é responsável por pegar o valor do banco e colocar nos campos do formulário, conforme o formControlName do HTML
      this.eventoForm.patchValue({
        nome: this.evento.nome,
        categoriaId: this.evento.categoriaId,
        descricaoCurta: this.evento.descricaoCurta,
        descricaoLonga: this.evento.descricaoLonga,
        dataInicio: DateUtils.setMyDatePickerDate(this.evento.dataInicio),
        dataFim: DateUtils.setMyDatePickerDate(this.evento.dataFim),
        gratuito: this.evento.gratuito,
        valor: valorBrl,
        online: this.evento.online,
        nomeEmpresa: this.evento.nomeEmpresa,
      });
  
      if (this.evento.endereco) {
        this.enderecoForm.patchValue({
          logradouro: this.evento.endereco.logradouro,
          numero: this.evento.endereco.numero,
          complemento: this.evento.endereco.complemento,
          bairro: this.evento.endereco.bairro,
          cep: this.evento.endereco.cep,
          cidade: this.evento.endereco.cidade,
          estado: this.evento.endereco.estado
        });
      }
    }
    
  editarEvento() {
    if (this.eventoForm.dirty && this.eventoForm.valid) {
      let e = Object.assign({}, this.evento, this.eventoForm.value);
      let user = JSON.parse(this.eventoService.getUser());

      e.organizadorId = user.id;

      e.valor = CurrencyUtils.ToDecimal(e.valor);
      e.dataInicio = DateUtils.getMyDatePickerDate(e.dataInicio);
      e.dataFim = DateUtils.getMyDatePickerDate(e.dataFim);

      this.eventoService.atualizarEvento(e)
      .subscribe(
        result => {this.onSaveComplete()},
        fail => { this.onError(fail) }
      )
    }
  }

  atualizarEndereco() {
    if (this.enderecoForm.dirty && this.enderecoForm.valid) {
      let p = Object.assign({}, this.endereco, this.enderecoForm.value);
      p.eventoId = this.eventoId;

      if (this.evento.endereco) {
        p.id = this.evento.endereco.id;
        this.eventoService.atualizarEndereco(p)
          .subscribe(
          result => { this.onEnderecoSaveComplete() },
          fail => { this.onErrorEndereco(fail) });
      }
      else {
        this.eventoService.adicionarEndereco(p)
          .subscribe(
          result => { this.onEnderecoSaveComplete() },
          fail => { this.onErrorEndereco(fail) });
      }
    }
  }

  onError(fail) {
    this.toastr.error('Ocorreu um erro no processamento', 'Ops! :(');
    this.errors = fail.error.errors;
  }

  onErrorEndereco(fail) {
    this.toastr.error('Ocorreu um erro no processamento do Endereço', 'Ops! :(');
    this.errorsEndereco = fail.error.errors;
  }

  public showModal(): void {
    this.modalVisible = true;
  }

  public hideModal(): void {
    this.modalVisible = false;
  }

  onEnderecoSaveComplete(): void {
    this.hideModal();

    this.toastr.success('Endereco Atualizado', 'Oba :D');
    this.obterEvento(this.eventoId);
  }
  
  onSaveComplete() {

    this.eventoForm.reset();
    this.errors = [];

    const toast = this.toastr.success('Evento Registrado com Sucesso!', 'Oba :D');
    if(toast) {
      toast.onHidden.subscribe( () => {
        this.router.navigate(['/eventos/meus-eventos']);
      })
    }
  }
}
