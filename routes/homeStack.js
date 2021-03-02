import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import WelcomeScreen from "../screens/WelcomeScreen";
import ContactList from "../screens/ContactList";


const screens ={
    WelcomeScreen: {
        screen : WelcomeScreen
    },
    ContactList: {
        screen : ContactList
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);