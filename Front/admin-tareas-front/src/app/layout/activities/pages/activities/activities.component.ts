import { Component } from '@angular/core';
import { MenuComponent } from '../../../../shared/menu/menu.component';
import { BusquedaComponent } from '../../../../shared/busqueda/busqueda.component';
import { NotifyComponent } from '../../../../shared/notify/notify.component';
import { UserLogoComponent } from '../../../../shared/user-logo/user-logo.component';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [MenuComponent, BusquedaComponent, NotifyComponent, UserLogoComponent],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent {

}
