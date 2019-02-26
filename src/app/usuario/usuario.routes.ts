import { Routes } from '@angular/router';

// components usuario
import { UsuarioComponent } from './usuario.component';
import { LoginComponent } from './login/login.component';
import { InscricaoComponent } from './inscricao/inscricao.component';

export const usuarioRouterConfig: Routes = [
    // Estou com três rotas criadas, a rota raiz aponta para uma outra rota home, o pathMatch full substitui toda a url
    {
        path: '', component: UsuarioComponent,
        children: [
            {path: '', component: LoginComponent},
            {path: 'entrar', component: LoginComponent},
            {path: 'inscricao', component: InscricaoComponent}
            ]
    }]