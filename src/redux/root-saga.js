import { all, call } from 'redux-saga/effects';

import { stockSagas } from './stock/stock.sagas';

export default function* rootSaga() {
  yield all([call(stockSagas)]);
}
