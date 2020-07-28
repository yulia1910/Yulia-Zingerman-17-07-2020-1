import { Action } from '@ngrx/store';
import { Favorite } from '../models';

export const LOAD_FAVORITES = 'Get All Saved Favorites';
export const ADD_TO_FAVORITES = 'Add City To Favorites';
export const REMOVE_FROM_FAVORITES = 'Remove City From Favorites';

export class GetFavorites implements Action {
    readonly type = LOAD_FAVORITES;
    constructor( public payload: Favorite ){}
}

export class AddToFavorites implements Action {
    readonly type = ADD_TO_FAVORITES;
    constructor( public payload: Favorite ){}
}

export class RemoveFromFavorites implements Action {
    readonly type = REMOVE_FROM_FAVORITES;
    constructor( public payload: string ){}
}

export type FavoriteActions = GetFavorites
 | AddToFavorites
 | RemoveFromFavorites;