import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import WelcomeScreen from "../screens/WelcomeScreen";
import ContactList from "../screens/ContactList";


const screens ={
    WelcomeScreen: {
        screen : WelcomeScreen,
        navigationOptions:{
            title:"Référez Un Ami"
        }
    },
    ContactList: {
        screen : ContactList,
        navigationOptions:{
            title:"Contactes"
        }
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);