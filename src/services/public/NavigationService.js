import { NavigationActions, StackActions } from 'react-navigation';

const NOT_INITIALIZED_MESSAGE = 'NavigationService not initialized';
let instance = null;

export default class NavigationService {
	static setup(navigatorRef) {
		instance = new NavigationService(navigatorRef);
	}

	static getInstance() {
		return instance;
	}

	constructor(navigatorRef) {
		this.navigator = navigatorRef;
	}

	static dispatch(...params) {
		if (instance === null) {
			console.log(NOT_INITIALIZED_MESSAGE);
			return;
		}

		return instance.navigator.dispatch(...params);
	}

	static navigate(routeName, { autoDispatch = true, ...params } = {}) {
		if (instance === null) {
			console.log(NOT_INITIALIZED_MESSAGE);
			return;
		}
		const action = NavigationActions.navigate({ routeName, params });

		if (!autoDispatch)
			return action;

		instance.navigator.dispatch(action);
	}

	static push(routeName, { autoDispatch = true, ...params } = {}) {
		if (instance === null) {
			console.log(NOT_INITIALIZED_MESSAGE);
			return;
		}
		const action = StackActions.push({ routeName, params });

		if (!autoDispatch)
			return action;

		instance.navigator.dispatch(action);
	}

	static back({ autoDispatch = true } = {}) {
		if (instance === null) {
			console.log(NOT_INITIALIZED_MESSAGE);
			return;
		}
		const action = NavigationActions.back();

		if (!autoDispatch)
			return action;

		instance.navigator.dispatch(action);
	}

	static popToTop({ autoDispatch = true } = {}) {
		if (instance === null) {
			console.log(NOT_INITIALIZED_MESSAGE);
			return;
		}
		const action = StackActions.popToTop();

		if (!autoDispatch)
			return action;

		instance.navigator.dispatch(action);
	}

	static setParams(key, { autoDispatch = true, ...params } = {}) {
		if (instance === null) {
			console.log(NOT_INITIALIZED_MESSAGE);
			return;
		}
		const action = NavigationActions.setParams({ key, params });

		if (!autoDispatch)
			return action;

		instance.navigator.dispatch(action);
	}
}
