import {Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import { AcessoNegadoComponent } from './shared/acesso-negado/acesso-negado.component';
import { NaoEncontradoComponent } from './shared/nao-encontrado/nao-encontrado.component';

export const rootRouterConfig: Routes = [
    // Estou com três rotas criadas, a rota raiz aponta para uma outra rota home, o pathMatch full substitui toda a url
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'acesso-negado', component: AcessoNegadoComponent},
    {path: 'nao-encontrado', component: NaoEncontradoComponent},
    // Aqui fazemos a conexão com os módulos independente Eventos e Usuarios
    {path: 'eventos', loadChildren: './eventos/evento.module#EventosModule'},
    {path: 'usuario', loadChildren: './usuario/usuario.module#UsuarioModule'}
]