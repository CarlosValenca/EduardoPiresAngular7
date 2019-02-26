import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components usuario
import { LoginComponent } from './login/login.component';
import { InscricaoComponent } from './inscricao/inscricao.component';

import { RouterModule } from '@angular/router';
import { usuarioRouterConfig } from './usuario.routes';
import { UsuarioComponent } from './usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(usuarioRouterConfig)
    ],
    declarations: [
        UsuarioComponent,
        InscricaoComponent,
        LoginComponent
    ],
    providers: [],
    exports: [
            // A declaração do RouterModule é importante para que os demais módulos possam visualizar o componente
            // EventoComponent
            RouterModule
    ]
})
export class UsuarioModule{}