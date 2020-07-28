import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { RoutingComponent } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DailyForecastComponent } from './daily-forecast/daily-forecast.component';
import { StoreModule } from '@ngrx/store';
import { favoritesReducer } from './reducers/favorites.reducer';
/* import { reducers, metaReducers } from './reducers'; */
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CityComponent } from './city/city.component';


@NgModule({
  declarations: [
    AppComponent,
    RoutingComponent,
    NotFoundPageComponent,
    HeaderComponent,
    DailyForecastComponent,
    CityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    FormsModule,
    StoreModule.forRoot({favorites: favoritesReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
