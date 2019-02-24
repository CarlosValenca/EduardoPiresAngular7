import { Component } from '@angular/core';
import { OrganizadorService } from 'src/app/services/organizador.service';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.css']
})

export class MenuSuperiorComponent {

  isCollapsed: boolean = false;

  constructor(private organizadorService: OrganizadorService) { }

  usuarioLogado() {

    return this.organizadorService.isAuthenticated();

  }

  ngOnInit() {
  }

}
