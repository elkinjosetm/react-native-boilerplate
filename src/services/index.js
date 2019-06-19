import React, { Component } from 'react';
import publicServices from './public';

const Context = React.createContext(null);
const Consumer = Context.Consumer;

class Provider extends Component {
	constructor() {
		super();

		this.state = { $services : publicServices };
	}

	shouldComponentUpdate = () => (true)

	render() {
		return (
			<Context.Provider value={ this.state }>
				{ this.props.children }
			</Context.Provider>
		);
	}
}

/**
 * HOC to inject $services
 * whenever we need to have
 * them in component level
 */
export const withServices = WrappedComponent => (class extends Component {
	render() {
		return (
			<Consumer>
				{({ $services }) => (
					<WrappedComponent
						$services={ $services }
						{ ...this.props }
					/>
				)}
			</Consumer>
		);
	}
});

export default {
	Provider,
	Consumer,
};
