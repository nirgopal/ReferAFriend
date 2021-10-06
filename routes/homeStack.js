import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import WelcomeScreen from "../screens/WelcomeScreen";
import ContactList from "../screens/ContactList";
import AccountScreen from "../screens/AccountScreen";
import LoginScreen from "../screens/LoginScreen";
import PasswordScreen from "../screens/ForgotPasswordScreen";
import PasswordConfirmScreen from "../screens/ForgotPasswordConfScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AppointmentScreen from "../screens/AppointmentScreen";
import ConfirmAppointmentScreen from "../screens/ConfirmAppointmentScreen";


const screens ={
    LoginScreen: {
        screen : LoginScreen,
        navigationOptions:{
            title:"Garde-Manger"
        }
    },
    WelcomeScreen: {
        screen : WelcomeScreen,
        navigationOptions:{
            title:"Garde-Manger"
        }
    },
    ContactList: {
        screen : ContactList,
        navigationOptions:{
            title:"Garde-Manger"
        }
    },
    PasswordScreen: {
        screen : PasswordScreen,
        navigationOptions:{
            title:"Garde-Manger"
        }
    },
    RegisterScreen: {
        screen : RegisterScreen,
        navigationOptions:{
            title:"Garde-Manger"
        }
    },
    PasswordConfirmScreen: {
        screen : PasswordConfirmScreen,
        navigationOptions:{
            title:"Garde-Manger"
        }
    },

    AccountScreen: {
        screen : AccountScreen,
        navigationOptions:{
            title:"Accounts"
        }
    },
    

    AppointmentScreen: {
        screen : AppointmentScreen,
        navigationOptions:{
            title:"Schedule An Appointment"
        }
    },
    ConfirmAppointmentScreen: {
        screen : ConfirmAppointmentScreen,
        navigationOptions:{
            title:"Garde-Manger"
        }
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);