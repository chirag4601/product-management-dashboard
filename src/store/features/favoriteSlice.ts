import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/product';

interface FavoriteState {
  favorites: Product[];
}

const initialState: FavoriteState = {
  favorites: []
};

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const exists = state.favorites.find(item => item.id === action.payload.id);
      if (exists) {
        state.favorites = state.favorites.filter(item => item.id !== action.payload.id);
      } else {
        state.favorites.push(action.payload);
      }
    }
  }
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;