import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { buttonStyle } from '@theme/_specs';

const TouchableComponent = Platform.OS === 'android' ? styled.TouchableNativeFeedback : styled.TouchableOpacity;

const Touchable = TouchableComponent`
	${buttonStyle}
`;

Touchable.defaultProps = {
	activeOpacity : 0.7,
};

export default Touchable;
