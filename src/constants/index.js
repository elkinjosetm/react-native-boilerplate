import map from 'lodash/map';

export const PRIORITIES = {
	low : {
		id    : 0,
		color : 'success',
	},
	mid : {
		id    : 1,
		color : 'warning',
	},
	high : {
		id    : 2,
		color : 'danger',
	},
};

export const PRIORITIES_ARRAY = map(PRIORITIES);

export default {
	PRIORITIES,
	PRIORITIES_ARRAY,
};
