// Estes 2 primeiros imports são mínimos para podermos criar um módulo novo compartilhado
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPrincipalComponent } from './main-principal/main-principal.component';
import { MenuLoginComponent } from './menu-login/menu-login.component';
import { NaoEncontradoComponent } from './nao-encontrado/nao-encontrado.component';
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';
import { MenuSuperiorComponent } from './menu-superior/menu-superior.component';
import { FooterComponent } from './footer/footer.component';

import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CollapseModule
    ],
    declarations: [
        MainPrincipalComponent,
        MenuLoginComponent,
        NaoEncontradoComponent,
        AcessoNegadoComponent,
        MenuSuperiorComponent,
        FooterComponent
    ],
    // O que torna este módulo compartilhável é esta parte exports, desta forma outros módulos podem
    // se beneficiar dos componentes aqui criados, por que agora eles são públicos
    // você define quais módulos serão públicos e quais serão privados (por exemplo o Collapse)
    exports: [
        MainPrincipalComponent,
        MenuLoginComponent,
        NaoEncontradoComponent,
        AcessoNegadoComponent,
        MenuSuperiorComponent,
        FooterComponent
    ]
})

export class SharedModule {}