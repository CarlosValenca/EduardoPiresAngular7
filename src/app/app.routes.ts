import {Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {ListaEventosComponent} from './eventos/lista-eventos/lista-eventos.component';

export const rootRouterConfig: Routes = [
    // Estou com três rotas criadas, a rota raiz aponta para uma outra rota home, o pathMatch full substitui toda a url
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'proximos-eventos', component: ListaEventosComponent}
]