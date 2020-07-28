import { Component, OnInit, Input } from '@angular/core';
import { ShortForecast } from '../models';

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.css']
})
export class DailyForecastComponent implements OnInit {
@Input() forecast: ShortForecast;
  constructor() { }

  ngOnInit(): void {
  }

}
