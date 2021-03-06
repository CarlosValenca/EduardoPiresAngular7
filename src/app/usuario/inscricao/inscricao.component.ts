// Coisas nativas do Angular
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

// Bibliotecas externas não nativas do Angular
import { Observable, fromEvent, merge } from 'rxjs';
import { CustomValidators } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';

// Coisas criadas por mim
import { Organizador } from '../models/organizador';
import { GenericValidator } from 'src/app/utils/genericValidator';
import { OrganizadorService } from 'src/app/services/organizador.service';

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
  public errors: any[] = [];
  botaoVisivel: boolean = true;
  inscricaoForm: FormGroup;
  organizador: Organizador;
  validationMessages: { [key: string]: { [key: string]: string } };
  displayMessage: { [key: string]: string } = {};

  gerericValidator: GenericValidator;

  // o fb ajudará a criar o formgroup
  constructor(private fb: FormBuilder,
              private organizadorService: OrganizadorService,
              private router: Router,
              private toastr: ToastrService) {

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

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.gerericValidator.processMessages(this.inscricaoForm);
    });
  }

  adicionarOrganizador(){
    // processar as mensagens dentro do validator e mostrar na tela pelo display message
    // this.displayMessage = this.gerericValidator.processMessages(this.inscricaoForm);
        
    // dirty = troquei o valor inicial do formulário
    if(this.inscricaoForm.valid && this.inscricaoForm.dirty){
      // pega os valores do formulário e mapeia na variável org
      let org  = Object.assign({}, this.organizador, this.inscricaoForm.value);

      // E necessário fazer a subscrição através do subscribe para avisar o Front End quando o Back End
      // terminou de processar o retorno do novo organizador
      this.organizadorService.registrarOrganizador(org)
        .subscribe(
          result => {this.onSaveComplete(result)},
          fail => {this.onError(fail)}
        );
    }
  }

  onSaveComplete(response: any) : void {
    // Já reseta o formulário de inscrição de um novo organizador para evitar o usuário criar várias
    // vezes o mesmo organizador
    this.inscricaoForm.reset();
    // Limpa a lista de possíveis erros anteriores
    this.errors = [];

    // localStorage.setItem('eio.token', response.access_token);
    // localStorage.setItem('eio.user', JSON.stringify(response.user));

    this.organizadorService.setLocalStorage(response.access_token, JSON.stringify(response.user));

    let toastrMessage = this.toastr.success("Usuario Registrado com Sucesso!","Bem Vindo!");

    // Aqui fizemos uma brincadeira para mostrar como funciona os eventos do toastr
    if(toastrMessage) {
      toastrMessage.onHidden.subscribe(() => {
        this.botaoVisivel = true;
        this.router.navigate(['/home']);
      });
      toastrMessage.onShown.subscribe(() => {
        this.inscricaoForm.controls
        this.botaoVisivel = false;
      });
    }
  }

  onError(fail: any) {
    this.errors = fail.error.errors;

    this.toastr.error("Ocorreu um Erro!","OPS!");
  }

}
