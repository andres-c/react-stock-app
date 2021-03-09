import stockActionTypes from './stock.types';

export const fetchStockStart = (stockName) => ({
  type: stockActionTypes.FETCH_STOCK_START,
  payload: { stockName },
});

export const fetchStockSuccess = (stock) => ({
  type: stockActionTypes.FETCH_STOCK_SUCCESS,
  payload: stock,
});

export const fetchStockFailure = (errorMessage) => ({
  type: stockActionTypes.FETCH_STOCK_FAILURE,
  payload: errorMessage,
});
