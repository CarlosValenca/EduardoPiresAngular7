import {Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {ListaEventosComponent} from './eventos/lista-eventos/lista-eventos.component';
import { InscricaoComponent } from './usuario/inscricao/inscricao.component';
import { LoginComponent } from './usuario/login/login.component';
import { AdicionarEventoComponent } from './eventos/adicionar-evento/adicionar-evento.component';
import { EventoAuthService } from './eventos/services/auth.evento.service';
import { AcessoNegadoComponent } from './shared/acesso-negado/acesso-negado.component';
import { NaoEncontradoComponent } from './shared/nao-encontrado/nao-encontrado.component';
import { MeusEventosComponent } from './eventos/meus-eventos/meus-eventos.component';

export const rootRouterConfig: Routes = [
    // Estou com três rotas criadas, a rota raiz aponta para uma outra rota home, o pathMatch full substitui toda a url
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'proximos-eventos', component: ListaEventosComponent},
    {path: 'inscricao', component: InscricaoComponent},
    {path: 'entrar', component: LoginComponent},
    {path: 'acesso-negado', component: AcessoNegadoComponent},
    {path: 'nao-encontrado', component: NaoEncontradoComponent},
    // O canActivate só permitirá entrar na rota através do serviço EventoAuthService
    {path: 'novo-evento', canActivate: [EventoAuthService], data:[{ claim: { nome: 'Eventos', valor: 'Gravar'} }], component: AdicionarEventoComponent},
    {path: 'meus-eventos', canActivate: [EventoAuthService], data:[{ claim: { nome: 'Eventos', valor: 'Gravar'} }], component: MeusEventosComponent}
]