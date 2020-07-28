import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  combineReducers
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { FavoritesState, favoritesReducer, favoriteNode } from './favorites.reducer';
import { InjectionToken } from '@angular/core';

export interface State {
  [favoriteNode]: FavoritesState;
}

export const reducers: ActionReducerMap<State> = {
[favoriteNode]: favoritesReducer,
};

export const reducerToken = new InjectionToken<ActionReducerMap<RTCIceConnectionState>>('Registered Reducers');

export const reducerProvider = [
  { provide: reducerToken, useValue: reducers },
];

/* 
const combinedReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
    return combinedReducer(state, action);
}
  
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : []; */

/* export const reducers = {
  [favoriteNode]: favoritesReducer
}; */
