import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../../../shared/menu/menu.component';
import { BusquedaComponent } from '../../../../shared/busqueda/busqueda.component';
import { UserLogoComponent } from '../../../../shared/user-logo/user-logo.component';
import { NotifyComponent } from '../../../../shared/notify/notify.component';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuComponent, BusquedaComponent, NotifyComponent, UserLogoComponent, ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit  {

  showNavigate: boolean = false;
  
  constructor(private appService: AppService) {}
  
  ngOnInit(): void {
  } // End ngOnInit() 

  onClick() {
    this.appService.navigate(!this.showNavigate)
  }
}
