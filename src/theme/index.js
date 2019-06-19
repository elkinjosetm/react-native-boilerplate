
import ColorLibrary from 'color';
import colors from './_colors';
import fonts from './_fonts';

export default {
	colors,
	fonts,
	utils : {
		fade    : (color, amount) => (ColorLibrary(color).fade(amount).string()),
		opaquer : (color, amount) => (ColorLibrary(color).opaquer(amount).string()),
		lighten : (color, amount) => (ColorLibrary(color).lighten(amount).string()),
		darken  : (color, amount) => (ColorLibrary(color).darken(amount).string()),
	},

	// Needed to be able to reset the styled system default spaces
	space : [ 0 ],
};
