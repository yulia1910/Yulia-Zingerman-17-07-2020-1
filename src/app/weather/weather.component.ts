import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { City, DailyForecasts, ShortForecast, DailyForecast, Favorite, LocationS} from '../models';
import { Observable, Subscription } from 'rxjs';
import { api } from '../globle';
import { FavoritesState } from '../reducers/favorites.reducer';
import { Store, select } from '@ngrx/store';
import { selectFavorites } from '../reducers/favorites.Selectors';
import { combineLatest } from 'rxjs';
import { isNullOrUndefined } from 'util';
import * as  FavoriteActions from '../reducers/favorites.action';
import { ActivatedRoute } from '@angular/router';
import { take, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers:  [ WeatherService ]
})
export class WeatherComponent implements OnInit {

  location: City[];
  dailyForecasts: DailyForecasts;
  title = " Weather";
  currentCity = api.defaultCity;
  currencyCityKey = api.defaultKey;
  header: string;
  selectedCountry: LocationS;
  selectedDay: ShortForecast;
  countriesSuggestions: LocationS[];
  forecasts: ShortForecast[];
  action: string;
  favorites: Favorite[];
  addRemoveAction ="Add to Favorites";
  private subscriptionSelectFavorites: Subscription;
  private subscriptionGetForeCast: Subscription;
  private subscriptionGetLocations: Subscription;
  private subscriptionSelectCountry: Subscription;
  private subscriptionFavorites: Subscription;
  errorR: string;

  constructor(private lacationService: WeatherService,
              private store: Store<FavoritesState>, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    let key = this.route.snapshot.paramMap.get('key');
    if( key == null ) {
      this.subscriptionSelectFavorites = this.store.select(selectFavorites ).subscribe( favoritesArr => {
        if ( favoritesArr.length != 0 ) {
          if ( favoritesArr.filter( item => item.key == this.currencyCityKey ).length != 0 ) {
            this.selectedCountry = {
              key: api.defaultKey,
              name: api.defaultCity,
              favorite: true
            };
            this.addRemoveAction = 'Remove Favorite';
          } else {
            this.selectedCountry = {
              key: api.defaultKey,
              name: api.defaultCity,
              favorite: false
            };
            this.addRemoveAction = 'Add To Favorites';
          }
        } else {
          this.selectedCountry = {
            key: api.defaultKey,
            name: api.defaultCity,
            favorite: false
          };
          this.addRemoveAction = 'Add To Favorites';
        }
      })
    } else {
      this.selectedCountry = {
        key: key,
        name: this.route.snapshot.paramMap.get('city'),
        favorite: true
      }  
      this.addRemoveAction = 'Remove Favorite';
    }
    this.currentCity = this.selectedCountry.name;
    this.header = `${this.selectedCountry.name}${this.title}`;

    this.subscriptionGetForeCast = this.lacationService.getForeCast(this.selectedCountry.key)
    .pipe(catchError(err => this.errorR = err )).subscribe( (res: DailyForecasts) => {
      this.dailyForecasts = res;
      this.getForecasts(res);
     }); 
  }

  searchCountry( event ) {
    this.subscriptionGetLocations = this.lacationService.getLocations( event.query )
      .pipe(catchError(err => this.errorR = err )).subscribe( (res: City[] ) => {
      this.countriesSuggestions = res.map(country => {
        return {
          key: country.Key,
          name: country.LocalizedName,
          favorite: false
        }
      })
   });

  }

  getUrl( icon ) {
    let idIcon = icon < 10 ? `0${icon}` : icon;
    return `${api.imageBaseUrl}${idIcon}-s.png`;
  }

  selectCountry( event ) {  //City 
    this.currentCity = event.name;
    this.header = `${this.currentCity}${this.title}`;
    this.currencyCityKey = event.key;

    this.subscriptionSelectCountry = this.lacationService.getForeCast(this.currencyCityKey)
      .pipe(catchError(err => this.errorR = err )).subscribe( (res: DailyForecasts) => {
      this.getForecasts(res);
    });

    this.subscriptionFavorites = this.store.select(selectFavorites ).subscribe( favoritesArr => {
      if ( favoritesArr.length != 0 ) {
        if ( favoritesArr.filter( item => item.key == event.key ).length != 0 ) {
          this.selectedCountry = {
            key: event.key,
            name: event.name,
            favorite: true
          };
          this.addRemoveAction = 'Remove Favorite';
        }else {
          this.selectedCountry = {
            key: event.key,
            name: event.name,
            favorite: false
          };
          this.addRemoveAction = 'Add To Favorites';
        }
      } else {
        this.selectedCountry = {
          key: event.key,
          name: event.name,
          favorite: false
        };
        this.addRemoveAction = 'Add To Favorites';
      }
    })
  }

  getForecasts( res ) {
    this.forecasts = res.DailyForecasts.map( ( day: DailyForecast ) => {
      return {
        iconUrl: this.getUrl(day.Day.Icon),
        day: new Date(day.Date).toLocaleString('en-us', {  weekday: 'short' }),
        dayLong: new Date(day.Date).toLocaleString('en-us', {  weekday: 'long' }),
        minTemp: day.Temperature.Minimum.Value.toString(),
        maxTemp: day.Temperature.Maximum.Value.toString(),
        unit: day.Temperature.Maximum.Unit,
        description: day.Day.IconPhrase,
        selected: false
      };
    });
    this.selectedDay = this.forecasts[0];
    this.selectedDay.selected = true;
  }

  onClick( forecast ) {
    this.forecasts.filter( res => res.selected == true )[0].selected = false;
    this.selectedDay = forecast;
    this.selectedDay.selected = true;
  }

  addOrRemoteFavorite( city ) {
    if ( city.favorite == false ) {
      this.selectedCountry = {
        key: this.selectedCountry.key,
        name: this.selectedCountry.name,
        favorite: true
      }
      this.store.dispatch( new FavoriteActions.AddToFavorites( {"key": this.selectedCountry.key.toString(),
      "cityName": this.selectedCountry.name} ));
      
      this.addRemoveAction = 'Remove Favorite';
    } else {
      this.store.dispatch( new FavoriteActions.RemoveFromFavorites( city.key ));
      this.selectedCountry = {
        key: this.selectedCountry.key,
        name: this.selectedCountry.name,
        favorite: false
      }
      this.addRemoveAction = 'Add To Favorites';
    }  
  }

  ngOnDestroy() {

    if ( !isNullOrUndefined( this.subscriptionSelectFavorites )) {
      this.subscriptionSelectFavorites.unsubscribe();
    }
    if ( !isNullOrUndefined( this.subscriptionGetForeCast )) {
      this.subscriptionGetForeCast.unsubscribe();
    }
    if ( !isNullOrUndefined( this.subscriptionGetLocations )) {
      this.subscriptionGetLocations.unsubscribe();
    }
    if ( !isNullOrUndefined( this.subscriptionSelectCountry )) {
      this.subscriptionSelectCountry.unsubscribe();
    }
    if ( !isNullOrUndefined( this.subscriptionFavorites ) ) {
      this.subscriptionFavorites.unsubscribe();
    }
  }
  
}