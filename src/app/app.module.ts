import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

// services
import { SeoService } from './services/seo.service';
import { InscricaoComponent } from './usuario/inscricao/inscricao.component';
import { OrganizadorService } from './services/organizador.service';
import { LoginComponent } from './usuario/login/login.component';
import { AdicionarEventoComponent } from './eventos/adicionar-evento/adicionar-evento.component';
import { EventoAuthService } from './eventos/services/auth.evento.service';

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
    AdicionarEventoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomFormsModule,
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
    EventoAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
