import axios from 'axios';
import { Platform, StatusBar } from 'react-native';
import isUndefined from 'lodash/isUndefined';
import { API } from '@config';
import { responseInterceptor, requestInterceptors } from './_clientInterceptors';

const isIOS = Platform.OS === 'ios';

/**
 * Function to perform get requests to the API
 *
 * @static
 * @param   {Object} params
 * @returns {Promise}
 *
 * @memberof AbstractService
 */
const get = params => request({
	...params,
	method : 'get',
});

/**
 * Function to perform post requests to the API
 *
 * @static
 * @param   {Object} params
 * @returns {Promise}
 *
 * @memberof AbstractService
 */
const post = params => request({
	...params,
	method : 'post',
});

/**
 * Function to perform put requests to the API
 *
 * @static
 * @param   {Object} params
 * @returns {Promise}
 *
 * @memberof AbstractService
 */
const put = params => request({
	...params,
	method : 'put',
});

/**
 * Function to perform delete requests to the API
 *
 * @static
 * @param   {Object} params
 * @returns {Promise}
 *
 * @memberof AbstractService
 */
const _delete = params => request({
	...params,
	method : 'delete',
});

/**
 * Function to perform an HTTP request with the given parameters,
 * every single Request should be executed through this function,
 * even if the request is to an third-party API
 *
 * @static
 * @param   {Object}
 * @returns {Promise}
 *
 * @memberof AbstractService
 */
const request = ({
	data,
	queryParams,
	getCancelExecutor,
	endpoint : url,
	method = 'get',
	withCredentials = true,
	baseURL = API.baseUrl,
	timeout = API.timeout,
	headers = API.defaultHeaders,
}) => new Promise((resolve, reject) => {
	let cancelToken = undefined;

	// Start network indicator
	if (isIOS)
		StatusBar.setNetworkActivityIndicatorVisible(true);

	/**
	 * If getCancelExecutor is provided we
	 * need to create the cancelToken for
	 * the request and then return the
	 * corresponding cancel executor back
	 */
	if (!isUndefined(getCancelExecutor))
		cancelToken = new axios.CancelToken(getCancelExecutor);

	axios({
		baseURL,
		url,
		method,
		data,
		timeout,
		withCredentials,
		headers,
		cancelToken,
		params : queryParams,
	})
		.then(response => {
			// Stop network indicator
			if (isIOS)
				StatusBar.setNetworkActivityIndicatorVisible(false);

			resolve(response);
		})
		.catch(error => {
			// Stop network indicator
			if (isIOS)
				StatusBar.setNetworkActivityIndicatorVisible(false);

			reject(error);
		});
});

/**
 * Setup interceptors
 */
axios.interceptors.request.use(requestInterceptors.interceptor, requestInterceptors.errorHandler);
axios.interceptors.response.use(responseInterceptor.interceptor, responseInterceptor.errorHandler);

export default {
	get,
	post,
	put,
	request,
	delete : _delete,
};
