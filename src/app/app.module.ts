import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { rootRouterConfig } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Configurações de Cultura Local
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

import { CustomFormsModule } from 'ng2-validation';
import { ToastrModule } from 'ngx-toastr';

// bootstrap
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';

// components home
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// components
import { AppRoutingModule } from './app-routing.module';

// services
import { SeoService } from './services/seo.service';
import { OrganizadorService } from './services/organizador.service';
import { ErrorHandlerService } from './services/error.handler.service';

// shared Modules : Importante fazer esta referência para poder utilizar os componentes compartilhados deste módulo
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
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
