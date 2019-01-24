import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';

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

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MainPrincipalComponent,
    MenuSuperiorComponent,
    HomeComponent,
    MenuLoginComponent,
    ListaEventosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CollapseModule.forRoot(), // Para aplicar no módulo raiz
    CarouselModule.forRoot(),
    RouterModule.forRoot(rootRouterConfig, { useHash: false})
  ],
  // providers são serviços
  providers: [
    Title,
    SeoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
