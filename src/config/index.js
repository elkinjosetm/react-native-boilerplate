import AsyncStorage from '@react-native-community/async-storage';
import { reduxStoreVersion, displayName } from '../../app';

export const APP = {
	displayName,
};

export const API = {
	baseUrl        : 'http : //localhost : 4444',
	timeout        : 6000,
	defaultHeaders : {},
};

export const DEBUG_SETTINGS = {
	inspectorLogging : __DEV__,
	useReduxDevTools : __DEV__,
};

export const REDUX_PERSIST = {
	storage   : AsyncStorage,
	key       : reduxStoreVersion,
	whitelist : [],
};

export default {
	APP,
	API,
	DEBUG_SETTINGS,
	REDUX_PERSIST,
};
