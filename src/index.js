import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { ThemeProvider } from 'styled-components';
import AppContainer from '@navigation';
import configureStore from '@redux-core';
import Services from '@services';
import theme from '@theme';

const { store, persistor } = configureStore();

export default class App extends Component {
	shouldComponentUpdate = () => (false)

	render() {
		return (
			<React.Fragment>
				<StatusBar
					barStyle="light-content"
				/>
				<ThemeProvider theme={ theme }>
					<Provider store={ store }>
						<PersistGate persistor={ persistor }>
							<Services.Provider>
								<Services.Consumer>
									{({ $services }) => (
										<AppContainer
											ref={ navigatorRef => { $services.navigation.setup(navigatorRef); } }
										/>
									)}
								</Services.Consumer>
							</Services.Provider>
						</PersistGate>
					</Provider>
				</ThemeProvider>
			</React.Fragment>
		);
	}
}
