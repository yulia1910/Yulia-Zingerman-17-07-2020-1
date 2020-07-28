import { createFeatureSelector, createSelector } from '@ngrx/store';
import { favoriteNode, FavoritesState } from './favorites.reducer';
import { Favorite } from '../models';

export const selectFavoritesState = createFeatureSelector<FavoritesState>(favoriteNode);

export const selectFavorites = createSelector(
    selectFavoritesState,
    (state: FavoritesState): Favorite[] => state.favorites
);