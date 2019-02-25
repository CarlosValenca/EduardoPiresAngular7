import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Configurações de Cultura Local
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);
import { MyDatePickerModule } from 'mydatepicker';

import { CustomFormsModule } from 'ng2-validation';
import { ToastrModule } from 'ngx-toastr';

// bootstrap
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';

// shared components
import { FooterComponent } from './shared/footer/footer.component';
import { MainPrincipalComponent } from './shared/main-principal/main-principal.component';
import { MenuSuperiorComponent } from './shared/menu-superior/menu-superior.component';

// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuLoginComponent } from './shared/menu-login/menu-login.component';
import { ListaEventosComponent } from './eventos/lista-eventos/lista-eventos.component';
import { AdicionarEventoComponent } from './eventos/adicionar-evento/adicionar-evento.component';
import { AcessoNegadoComponent } from './shared/acesso-negado/acesso-negado.component';
import { NaoEncontradoComponent } from './shared/nao-encontrado/nao-encontrado.component';
import { InscricaoComponent } from './usuario/inscricao/inscricao.component';
import { LoginComponent } from './usuario/login/login.component';
import { MeusEventosComponent } from './eventos/meus-eventos/meus-eventos.component';

// services
import { SeoService } from './services/seo.service';
import { OrganizadorService } from './services/organizador.service';
import { EventoAuthService } from './eventos/services/auth.evento.service';
import { EventoService } from './eventos/services/evento.service';
import { ErrorHandlerService } from './services/error.handler.service';
import { EditarEventoComponent } from './eventos/editar-evento/editar-evento.component';
import { DetalhesEventoComponent } from './eventos/detalhes-evento/detalhes-evento.component';
import { ExcluirEventoComponent } from './eventos/excluir-evento/excluir-evento.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MainPrincipalComponent,
    MenuSuperiorComponent,
    HomeComponent,
    MenuLoginComponent,
    ListaEventosComponent,
    InscricaoComponent,
    LoginComponent,
    AdicionarEventoComponent,
    AcessoNegadoComponent,
    NaoEncontradoComponent,
    MeusEventosComponent,
    EditarEventoComponent,
    DetalhesEventoComponent,
    ExcluirEventoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomFormsModule,
    MyDatePickerModule,
    ToastrModule.forRoot(),
    CollapseModule.forRoot(), // Para aplicar no módulo principal
    CarouselModule.forRoot(),
    RouterModule.forRoot(rootRouterConfig, { useHash: false})
  ],
  // providers são serviços
  providers: [
    Title,
    SeoService,
    OrganizadorService,
    EventoAuthService,
    EventoService,
    // Para o intercept funcionar é necessário declarar ele de forma diferente dos outros
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerService,
      // O multi determina se o intercept atuará em um ou mais módulos
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
