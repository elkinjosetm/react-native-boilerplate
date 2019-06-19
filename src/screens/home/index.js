import React, { Component } from 'react';
import { View, Text } from '@components/primitives';
import { connect } from 'react-redux';
import { withServices } from '@services';
import Strings from '@i18n';

class HomeScreen extends Component {
	shouldComponentUpdate = () => (true)

	render() {
		return (
			<View>
				<Text>Hello world</Text>
			</View>
		);
	}
}

const Screen = withServices(connect()(HomeScreen));

/**
 * Navigation Options needs
 * to be defined on top of
 * the HOC
 */
Screen.navigationOptions = {
	title : Strings.home,
};

export default Screen;
