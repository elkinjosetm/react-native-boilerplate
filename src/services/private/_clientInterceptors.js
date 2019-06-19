import axios from 'axios';
import { getStatusText } from 'http-status-codes';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import moment from 'moment';
import { DEBUG_SETTINGS, API } from '@config';
import Colors from '@theme/_colors';

const logGroup = (...params) => {
	const name = params[0];
	let styles = [];
	let content = () => {};

	if (isArray(params[1])) {
		styles = params[1];
		content = params[2];
	} else
		content = params[1];

	console.groupCollapsed(name, ...styles);
	content();
	console.groupEnd();
};

export const logRequest = config => {
	// Only log when inspectorLogging is enabled
	if (!DEBUG_SETTINGS.inspectorLogging)
		return;

	try {
		const title = [
			'%c API Request',
			`%c ${get(config, 'method', '').toUpperCase()}`,
			`%c@ ${moment().format('HH:mm:ss')}`
		];
		const style = [
			`background: ${Colors.venus}; color: ${Colors.white}`,
			'',
			`color: ${Colors.boulder}; font-weight: lighter;`
		];
		const url = axios.getUri(config);
		const params = get(config, [ 'params' ]);
		const body = get(config, 'data');

		logGroup(title.join(' '), style, () => {
			if (url)
				logGroup('url', () => console.log(url.replace(API.baseUrl, '')));

			if (params)
				logGroup('params', () => console.log(params));

			if (body)
				logGroup('body', () => console.log(body));

			logGroup('config', () => console.log(config));
		});
	} catch (exception) {
		console.log(exception);
	}
};

export const logResponse = (response, { isError = false, isCanceled = false, rawError } = {}) => {
	// Only log when inspectorLogging is enabled
	if (!DEBUG_SETTINGS.inspectorLogging)
		return;

	let backgroundColor = Colors.japaneseLaurel;

	if (isError && !isCanceled)
		backgroundColor = Colors.brickRed;
	else if (isError && isCanceled)
		backgroundColor = Colors.blazeOrange;

	try {
		const config = get(response, [ 'config' ], {});
		const title = [
			'%c API Response',
			`%c ${get(config, [ 'method' ], '').toUpperCase()}`,
			`%c@ ${moment().format('HH:mm:ss')}`
		];
		const style = [
			`background-color: ${backgroundColor}; color: ${Colors.white}`,
			'',
			`color: ${Colors.boulder}; font-weight: lighter;`
		];

		logGroup(title.join(' '), style, () => {
			/**
			 * If the request has been
			 * canceled we just need to
			 * log a single message about
			 * it.
			 */
			if (isCanceled) {
				console.log('The request has been canceled');
				return;
			}

			const url = axios.getUri(config);
			const data = get(response, 'data');
			const status = get(response, 'status');
			let statusText;

			try {
				statusText = getStatusText(status);
			} catch (error) {
				// ...
			}

			console.log('Status:', status, statusText);

			if (isError && data)
				logGroup('Response error message', () => console.log(get(data, 'ErrorMessage') || get(data, 'Message')));

			if (isError)
				logGroup('Error message', () => console.log(get(rawError, 'message')));

			if (url)
				logGroup('url', () => console.log(url.replace(API.baseUrl, '')));

			logGroup('data', () => console.log(data));
			logGroup('rawResponse', () => console.log(response));

			if (isError)
				logGroup('rawError', () => console.log(rawError));
		});
	} catch (exception) {
		console.log(exception);
	}
};

export const requestInterceptors = {
	interceptor : config => {
		logRequest(config);

		return config;
	},
	errorHandler : error => {
		logRequest(error);

		return Promise.reject(error);
	},
};

export const responseInterceptor = {
	interceptor : response => {
		logResponse(response);

		return response;
	},
	errorHandler : rawError => {
		logResponse(get(rawError, 'response'), {
			rawError,
			isError    : true,
			isCanceled : axios.isCancel(rawError),
		});

		return Promise.reject(rawError);
	},
};
