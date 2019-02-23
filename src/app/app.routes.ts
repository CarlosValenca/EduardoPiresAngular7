import {Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {ListaEventosComponent} from './eventos/lista-eventos/lista-eventos.component';
import { InscricaoComponent } from './usuario/inscricao/inscricao.component';
import { LoginComponent } from './usuario/login/login.component';
import { AdicionarEventoComponent } from './eventos/adicionar-evento/adicionar-evento.component';
import { EventoAuthService } from './eventos/services/auth.evento.service';

export const rootRouterConfig: Routes = [
    // Estou com três rotas criadas, a rota raiz aponta para uma outra rota home, o pathMatch full substitui toda a url
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'proximos-eventos', component: ListaEventosComponent},
    {path: 'inscricao', component: InscricaoComponent},
    {path: 'entrar', component: LoginComponent},
    // O canActivate só permitirá entrar na rota através do serviço EventoAuthService
    {path: 'novo-evento', canActivate: [EventoAuthService], component: AdicionarEventoComponent}
]