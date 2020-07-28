import { Component, OnInit } from '@angular/core';
import { FavoritesState } from '../reducers/favorites.reducer';
import { Store } from '@ngrx/store';
import { selectFavorites } from '../reducers/favorites.Selectors';
import { WeatherService } from '../weather/weather.service';
import { switchMap, catchError } from 'rxjs/operators';
import { favoriteLocation, Favorite } from '../models';
import { CurrentCondition } from '../models';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  providers: [ WeatherService ]
})
export class FavoritesComponent implements OnInit {
  header = 'Favorite Locations';
  favorites: favoriteLocation[] = [];
 private subscription1: Subscription;
 private subscriptions: Subscription[] = [];
  constructor(private store: Store<FavoritesState>,  
              private weatherService: WeatherService,
              private router: Router) {}

  ngOnInit(): void {
    this.subscription1 = this.store.select( selectFavorites ).subscribe( favoritesArr => {
      favoritesArr.map( city => {
        this.subscriptions.push( this.weatherService.getCurrentCondition( city.key ).subscribe( (cond: CurrentCondition[])  => {
          this.favorites.push({
          "key": city.key,
          "cityName": city.cityName,
          "temp": cond[0].Temperature.Imperial.Value + cond[0].Temperature.Imperial.Unit,
          "description": cond[0].WeatherText
          });
         
        }));
        
      });
    }); 
  }

  onClick( key, city ) {
    this.router.navigate(['weather', key, city.toString()]);
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
