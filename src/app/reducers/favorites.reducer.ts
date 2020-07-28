import { Favorite } from '../models';
import *  as FromFavoriteActions from './favorites.action';

export const favoriteNode = 'favorites';

export interface FavoritesState {
    favorites: Favorite[],
}

const initinalState: FavoritesState = {
    favorites: []
}

export function favoritesReducer( state: FavoritesState = initinalState, action: FromFavoriteActions.FavoriteActions ): FavoritesState{
    switch( action.type ) {
        case FromFavoriteActions.ADD_TO_FAVORITES: {
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }
        }
        case FromFavoriteActions.REMOVE_FROM_FAVORITES: {
            return {
                ...state,
                favorites: state.favorites.filter( item => item.key != action.payload )
            }
        }
    default:
        return state
    }
}