import { createStackNavigator, createAppContainer } from 'react-navigation';
import { navStyles } from '@theme/_specs';
import ROUTES from '@navigation/routes';

// Screens
import Home from '@screens/home';

const MainStack = createStackNavigator({
	[ROUTES.HOME] : { screen : Home },
}, {
	initialRouteName         : ROUTES.HOME,
	cardStyle                : navStyles.cardStyle,
	defaultNavigationOptions : {
		headerTitleStyle : navStyles.headerTitleStyle,
		headerTintColor  : navStyles.headerTintColor,
		headerStyle      : navStyles.headerStyle,
	},
});

const AppNavigator = createStackNavigator({
	[ROUTES.MAIN] : { screen : MainStack },
}, {
	initialRouteName : ROUTES.MAIN,
	mode             : 'modal',
	headerMode       : 'none',
	cardStyle        : navStyles.cardStyle,
});

export default createAppContainer(AppNavigator);
