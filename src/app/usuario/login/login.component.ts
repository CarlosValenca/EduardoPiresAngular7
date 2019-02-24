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
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, AfterViewInit {

  // Pega elementos do HTML para trabalhar com estes elementos
  // Vamos obter o evento blur deles
  // formInputElements é uma coleção de todos os elementos do HTML
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  // vai gerenciar os itens do formulário
  public errors: any[] = [];
  botaoVisivel: boolean = true;
  loginForm: FormGroup;
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
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      senha: {
        required: 'Informe a senha',
        minlength: 'A senha precisa ter pelo menos 6 caracteres'
      }
    }

    this.gerericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {

    // estou criando um grupo de formulários que retorna um form group
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, CustomValidators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  ngAfterViewInit() {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.gerericValidator.processMessages(this.loginForm);
    });
  }

  login(){
    // processar as mensagens dentro do validator e mostrar na tela pelo display message
    // this.displayMessage = this.gerericValidator.processMessages(this.loginForm);
        
    // dirty = troquei o valor inicial do formulário
    if(this.loginForm.valid && this.loginForm.dirty){
      // pega os valores do formulário e mapeia na variável org
      let org  = Object.assign({}, this.organizador, this.loginForm.value);

      // E necessário fazer a subscrição através do subscribe para avisar o Front End quando o Back End
      // terminou de processar o retorno do novo organizador
      this.organizadorService.login(org)
        .subscribe(
          result => {this.onSaveComplete(result)},
          fail => {this.onError(fail)}
        );
    }
  }

  onSaveComplete(response: any) : void {
    // Já reseta o formulário de inscrição de um novo organizador para evitar o usuário criar várias
    // vezes o mesmo organizador
    this.loginForm.reset();
    // Limpa a lista de possíveis erros anteriores
    this.errors = [];

    // localStorage.setItem('eio.token', response.access_token);
    // localStorage.setItem('eio.user', JSON.stringify(response.user));

    this.organizadorService.setLocalStorage(response.access_token, JSON.stringify(response.user));

    let toastrMessage = this.toastr.success("Login Realizado com Sucesso!","Bem Vindo !");

    // Aqui fizemos uma brincadeira para mostrar como funciona os eventos do toastr
    if(toastrMessage) {
      toastrMessage.onHidden.subscribe(() => {
        this.botaoVisivel = true;
        this.router.navigate(['/home']);
      });
      toastrMessage.onShown.subscribe(() => {
        this.loginForm.controls
        this.botaoVisivel = false;
      });
    }
  }

  onError(fail: any) {
    this.errors = fail.error.errors;

    this.toastr.error("Ocorreu um Erro!","OPS!");
  }

}
