import { all } from 'redux-saga/effects';

/* ------------- Sagas ------------- */
import appWatcher from '@redux/app/sagas';

/**
 * Define rootSagas and inject
 * any possible parameter the
 * we might want to inject from
 * store definition
 */
export default function* rootSaga(...args) {
	yield all([ appWatcher(...args) ]);
}
