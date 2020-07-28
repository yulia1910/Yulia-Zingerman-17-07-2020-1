import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';


const routes: Routes = [
  { path: '', component: WeatherComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'weather/:key/:city', component: WeatherComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponent = [WeatherComponent, FavoritesComponent]
