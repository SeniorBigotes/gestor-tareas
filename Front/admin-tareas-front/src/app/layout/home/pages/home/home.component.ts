import { Component, OnInit } from '@angular/core';
import { BusquedaComponent } from '../../../../shared/busqueda/busqueda.component';
import { HomeService } from '../../home.service';
import { MyActivitiesComponent } from '../../components/my-activities/my-activities.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BusquedaComponent, MyActivitiesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  showNavigate: boolean = false;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.showNavigate$.subscribe(show => this.showNavigate = show);
  }

  onClick(): void {  
    this.showNavigate = true;
    this.homeService.navigate(this.showNavigate);
  }
}

