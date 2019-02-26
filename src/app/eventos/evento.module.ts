// Obs: Módulos que são utilizados por toda a aplicação como o Toastr por exemplo você deixa no módulo
// principal (APP), módulos que são utilizados especificamente em eventos (datePicker por exemplo)
// você traz para cá
// Obs 2: Aqui estamos criando um evento Independente

// Estes 2 primeiros imports são mínimos para podermos criar um módulo novo compartilhado
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components used by eventos
import { Title } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// components eventos
import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { MeusEventosComponent } from './meus-eventos/meus-eventos.component';
import { AdicionarEventoComponent } from './adicionar-evento/adicionar-evento.component';
import { EditarEventoComponent } from './editar-evento/editar-evento.component';
import { DetalhesEventoComponent } from './detalhes-evento/detalhes-evento.component';
import { ExcluirEventoComponent } from './excluir-evento/excluir-evento.component';

// services
import { OrganizadorService } from '../services/organizador.service';
import { EventoService } from './services/evento.service';
import { ErrorHandlerService } from '../services/error.handler.service';
import { SeoService } from '../services/seo.service';
import { EventoAuthService } from './services/auth.evento.service';

// router
import { eventosRouterConfig } from './evento.routes';

// Configurações de Cultura Local
import { MyDatePickerModule } from 'mydatepicker';
import { EventoComponent } from './evento.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MyDatePickerModule,
        RouterModule.forChild(eventosRouterConfig)
    ],
    declarations: [
        // Importantíssimo declarar a existência do componente EventoComponent
        EventoComponent,
        ListaEventosComponent,
        MeusEventosComponent,
        AdicionarEventoComponent,
        EditarEventoComponent,
        DetalhesEventoComponent,
        ExcluirEventoComponent
    ],
  // providers são serviços
  providers: [
    OrganizadorService,
    EventoService,
    Title,
    SeoService,
    EventoAuthService,
        // Para o intercept funcionar é necessário declarar ele de forma diferente dos outros
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorHandlerService,
          // O multi determina se o intercept atuará em um ou mais módulos
          multi: true
        }
    
  ],
  exports: [
    // A declaração do RouterModule é importante para que os demais módulos possam visualizar o componente
    // EventoComponent
    RouterModule
  ]
})

export class EventosModule {}