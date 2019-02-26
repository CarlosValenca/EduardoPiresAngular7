import { Routes } from '@angular/router';

import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { DetalhesEventoComponent } from './detalhes-evento/detalhes-evento.component';
import { EventoAuthService } from './services/auth.evento.service';
import { AdicionarEventoComponent } from './adicionar-evento/adicionar-evento.component';
import { EditarEventoComponent } from './editar-evento/editar-evento.component';
import { ExcluirEventoComponent } from './excluir-evento/excluir-evento.component';
import { MeusEventosComponent } from './meus-eventos/meus-eventos.component';
import { EventoComponent } from './evento.component';

export const eventosRouterConfig: Routes = [
    // Estou com três rotas criadas, a rota raiz aponta para uma outra rota home, o pathMatch full substitui toda a url
    {
        path: '', component: EventoComponent,
        children: [
            {path: '', component: ListaEventosComponent},
            {path: 'lista-eventos', component: ListaEventosComponent},
            {path: 'detalhes/:id', component: DetalhesEventoComponent},
            // O canActivate só permitirá entrar na rota através do serviço EventoAuthService
            {path: 'novo', canActivate: [EventoAuthService], data:[{ claim: { nome: 'Eventos', valor: 'Gravar'} }], component: AdicionarEventoComponent},
            // É possível passar mais parâmetros assim: editar-eventos/:id/:id2/:id3/:id4 etc...
            {path: 'editar/:id', canActivate: [EventoAuthService], data:[{ claim: { nome: 'Eventos', valor: 'Gravar'} }], component: EditarEventoComponent},
            {path: 'excluir/:id', canActivate: [EventoAuthService], data:[{ claim: { nome: 'Eventos', valor: 'Gravar'} }], component: ExcluirEventoComponent},
            {path: 'meus-eventos', canActivate: [EventoAuthService], data:[{ claim: { nome: 'Eventos', valor: 'Gravar'} }], component: MeusEventosComponent}
            ]
    }]