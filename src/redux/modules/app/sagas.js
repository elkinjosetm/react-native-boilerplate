import { all, takeLatest, put } from 'redux-saga/effects';
import { Actions, Types } from './';

/**
 * Initial app handler
 */
function* init() {
	try {
		yield put(Actions.initSuccess());
	} catch (exception) {
		console.log(exception);
		yield put(Actions.initFailure('Ops! Something went wrong!'));
	}
}

/**
 * Watcher
 */
export default function* watcher() {
	yield all([ yield takeLatest(Types.INIT, init) ]);
}
