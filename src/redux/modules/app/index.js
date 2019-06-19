import { createActions, createReducer } from 'reduxsauce';
import produce from 'immer';

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
	isInitiated : false,
	error       : null,
};

/* ------------- Types and Action Creators ------------- */
export const { Types, Creators : Actions } = createActions({
	init        : null,
	initSuccess : null,
	initFailure : [ 'error' ],
}, { prefix : '@app/' });

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
	[Types.INIT_SUCCESS] : state => produce(state, draft => {
		draft.isInitiated = true;
		draft.error = null;
	}),

	[Types.INIT_FAILURE] : (state, { error }) => produce(state, draft => {
		draft.isInitiated = false;
		draft.error = error;
	}),
});

export default Actions;
