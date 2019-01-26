// ssbcvp - video 2 00:26:00
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, FormControl } from '@angular/forms';

import { Observable, fromEvent, merge } from 'rxjs';

import { Organizador } from '../models/organizador';
import { GenericValidator } from 'src/app/utils/genericValidator';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-inscricao',
  templateUrl: './inscricao.component.html'
})
export class InscricaoComponent implements OnInit, AfterViewInit {

  // Pega elementos do HTML para trabalhar com estes elementos
  // Vamos obter o evento blur deles
  // formInputElements é uma coleção de todos os elementos do HTML
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  // vai gerenciar os itens do formulário
  inscricaoForm: FormGroup;
  organizador: Organizador;
  validationMessages: { [key: string]: { [key: string]: string } };
  displayMessage: { [key: string]: string } = {};

  gerericValidator: GenericValidator;

  // o fb ajudará a criar o formgroup
  constructor(private fb: FormBuilder) {

    // o nome das propriedades dentro do objeto nome precisam ser iguais ao nome das propriedades que validam o campo
    // do contrário não traz a mensagem na tela
    this.validationMessages = {
      nome: {
        required: 'O nome é requerido',
        minlength: 'O nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O nome precisa ter no máximo 150 caracteres'
      },
      cpf: {
        required: 'Informe o CPF',
        rangeLength: 'O CPF precisa ter 11 caracteres'
      },
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      senha: {
        required: 'Informe a senha',
        minlength: 'A senha precisa ter pelo menos 6 caracteres',
        equalTo: 'As senhas não conferem'
      },
      senhaConfirmacao: {
        required: 'Informe a senha de confirmação',
        minlength: 'A senha de confirmação precisa ter pelo menos 6 caracteres',
        equalTo: 'As senhas não conferem'
      }
    }

    this.gerericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {

    // estamos confirmando se ambas as senhas são iguais
    let senha = new FormControl('', [Validators.required, Validators.minLength(6)]);
    let senhaConfirmacao = new FormControl('', [Validators.required, Validators.minLength(6), CustomValidators.equalTo(senha)]);

    // estou criando um grupo de formulários que retorna um form group
    this.inscricaoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(2)]],
      cpf: ['', [Validators.required, CustomValidators.rangeLength([11,11])]],
      email: ['', [Validators.required, CustomValidators.email]],
      senha: senha,
      senhaConfirmacao: senhaConfirmacao
    });

  }

  ngAfterViewInit() {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.gerericValidator.processMessages(this.inscricaoForm);
    });
  }

  /*
  // validar o comportamento do formulário após a tela HTML ser iniciada
  // É um item de uma biblioteca de componentes reativos do java script, é uma espécie de callback inteligente
  // ficará esperando alguma coisa responder para tomar alguma ação através do comando subscribe
  // Criei uma coleção de objetos observáveis, alimentando esta coleção através do mapeamento desta coleção de mapeamentos
  // onde desta coleção de elementos a única coisa que interessa é o evento blur de todos os inputs
  ngAfterViewInit() {
    let dummy = "Entrei aqui";
    
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement,'blur'));

    // o ... se aplica a todos os itens da coleção que forem blur
    // quando for disparado um blur de qualquer um dos items do meu html eu quero que o formulário seja validado
    // processar as mensagens dentro do validator e mostrar na tela pelo display message
    merge(...controlBlurs).subscribe(value => {
        this.displayMessage = this.gerericValidator.processMessages(this.inscricaoForm);
    });
}
*/

  adicionarOrganizador(){
    // processar as mensagens dentro do validator e mostrar na tela pelo display message
    // this.displayMessage = this.gerericValidator.processMessages(this.inscricaoForm);
    
    // pega os valores do formulário e mapeia na variável org
    let org  = Object.assign({}, this.organizador, this.inscricaoForm.value);
    
    // dirty = troquei o valor inicial do formulário
    if(this.inscricaoForm.valid && this.inscricaoForm.dirty){
      this.organizador = org;
    }
  }
}
