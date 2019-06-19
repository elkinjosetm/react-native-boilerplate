import React from 'react';
import styled from 'styled-components/native';
import { buttonTextStyle } from '@theme/_specs';
import Touchable from './touchable';

const ButtonText = styled.Text`
	${buttonTextStyle}
`;

const Button = ({ title, ...params }) => (
	<Touchable { ...params }>
		<ButtonText>{ title }</ButtonText>
	</Touchable>
);

export default Button;
