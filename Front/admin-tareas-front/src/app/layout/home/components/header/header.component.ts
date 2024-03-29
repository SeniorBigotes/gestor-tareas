import { Component } from '@angular/core';
import { MenuComponent } from '../../../../shared/menu/menu.component';
import { UserLogoComponent } from '../../../../shared/user-logo/user-logo.component';
import { NotifyComponent } from '../../../../shared/notify/notify.component';
import { HomeService } from '../../home.service';
import { BusquedaComponent } from '../../../../shared/busqueda/busqueda.component';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuComponent, BusquedaComponent ,UserLogoComponent, NotifyComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  showNavigate: boolean = false;


  constructor(private appService: AppService) {}
  
   ngOnInit(): void {
    this.appService.showNavigate$.subscribe(show => this.showNavigate = show);
   }

  // menu / navegacion
  onClick(): void {  
    this.appService.navigate(!this.showNavigate);
  }

}
