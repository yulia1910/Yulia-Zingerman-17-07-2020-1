import { Component, OnInit, Input } from '@angular/core';
import { favoriteLocation } from '../models';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  @Input() location: favoriteLocation;

  constructor() {}

  ngOnInit(): void {
  }

}
