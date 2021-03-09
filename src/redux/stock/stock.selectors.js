import { createSelector } from 'reselect';

const selectStock = (state) => state.stock;

export const selectCurrentStock = createSelector(
  [selectStock],
  (state) => state.stock
);

export const selectIsStocksFetching = (state) => state.stock.isFetching;

export const selectIsStockLoaded = (state) => state.stock.isLoaded;
