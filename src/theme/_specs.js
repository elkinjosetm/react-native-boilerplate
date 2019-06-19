import {
	space,
	fontSize,
	color,
	flex,
	flexWrap,
	flexBasis,
	flexDirection,
	alignItems,
	alignSelf,
	justifyContent,
	borderColor,
	borderRadius,
	fontFamily,
	fontWeight,
	lineHeight,
	textAlign,
	position,
	zIndex,
	top,
	right,
	bottom,
	left,
} from 'styled-system';
import { css } from 'styled-components/native';
import colors from './_colors';
import fonts from './_fonts';

export const viewStyle = css`
	${space}
	${color}
	${alignSelf}
	${alignItems}
	${justifyContent}
	${borderColor}
	${borderRadius}
	${flex}
	${flexWrap}
	${flexBasis}
	${flexDirection}
	${position}
	${zIndex}
	${top}
	${right}
	${bottom}
	${left}
`;

export const textStyle = css`
	font-family : ${fonts.regular};
	font-size : 16;
	${space}
	${color}
	${fontFamily}
	${fontSize}
	${fontWeight}
	${textAlign}
	${lineHeight}
	${flex}
	${flexWrap}
	${flexBasis}
	${flexDirection}
	${position}
	${zIndex}
	${top}
	${right}
	${bottom}
	${left}
`;

export const containerStyle = css`
	flex : 1;
	${space}
	${color}
	${alignSelf}
	${alignItems}
	${justifyContent}
	${flex}
	${flexWrap}
	${flexBasis}
	${flexDirection}
	${position}
	${zIndex}
	${top}
	${right}
	${bottom}
	${left}
`;

export const buttonStyle = css`
	${viewStyle}
`;

export const buttonTextStyle = css`
	color : ${colors.primary};
	font-family : ${fonts.bold};
	${textStyle}
`;

export const navStyles = {
	cardStyle        : { backgroundColor : colors.background },
	headerTitleStyle : { fontFamily : fonts.regular },
	headerTintColor  : colors.white,
	headerStyle      : {
		backgroundColor   : colors.primary,
		borderBottomWidth : 0,
	},
};
