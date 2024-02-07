import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../../activities.service';
import { Activities } from '../../../../models/IActivity';

@Component({
  selector: 'app-action-buttons',
  standalone: true,
  imports: [],
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.scss'
})
export class ActionButtonsComponent implements OnInit {

  activity!: Activities;

  constructor(private activitiesService: ActivitiesService) {}
  
  ngOnInit(): void {
    this.activitiesService.$getActivity.subscribe(activity => {
      if(activity) this.activity = activity;
    })
  }

  onClick(): void {
    console.log('click...')
  }
}
