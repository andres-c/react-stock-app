import stocksActionTypes from './stock.types';

const INITIAL_STATE = {
  stocks: null,
};

const stocksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case stocksActionTypes.FETCH_STOCK_START:
      return {
        ...state,
        isFetching: true,
      };
    case stocksActionTypes.FETCH_STOCK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        stock: action.payload,
        errorMessage: undefined,
      };
    case stocksActionTypes.FETCH_STOCK_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default stocksReducer;
