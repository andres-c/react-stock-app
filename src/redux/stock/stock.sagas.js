import { all, call, put, takeLatest } from "redux-saga/effects";

import { fetchStockFailure, fetchStockSuccess } from "./stock.actions";
import stocksActionTypes from "./stock.types";

import apple from "../../data/apple.json";
import amazon from "../../data/amazon.json";
import tesla from "../../data/tesla.json";

const stocks = {
	apple,
	amazon,
	tesla,
};

export function* fetchStockAsync({ payload: { stockName } }) {
	try {
		const data = stocks[stockName];
		yield put(fetchStockSuccess(data));
	} catch (error) {
		yield put(fetchStockFailure(error.message));
	}
}

export function* fetchStockStart() {
	yield takeLatest(stocksActionTypes.FETCH_STOCK_START, fetchStockAsync);
}

export function* stockSagas() {
	yield all([call(fetchStockStart)]);
}
