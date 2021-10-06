import React from "react";
import { ImageBackground, StyleSheet, Image } from "react-native";
import {
  Container,
  Button,
  Text,
  Card,
  CardItem,
  Body,
  Icon,
  Item,
  Input,
} from "native-base";
import locale from "../locales";

class ConfirmAppointmentScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      locale: null,
    };
  }
  componentDidMount() {
    this.setState({ name: null });
    this.setState({ phone: null });
    this.setState({ rep: null });
    this.setState({ nameError: null });
    this.setState({ phoneError: null });
    this.setState({ repError: null });
    this.setState({ invalidPhone: false });
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  backtoLogin = () => {
    const { navigation } = this.props;
   
      
        navigation.navigate("LoginScreen", {
         
        });
      
    }
  

  onPressSendEmail = (name, phoneNumber) => {
    email("conseiller@garde-manger.com", {
      subject:
        this.state.localization === "en"
          ? locale.en.newEmail
          : locale.fr.newEmail,

      body: name,
      phoneNumber,
    }).catch(console.error);
    //navigation.navigate("WelcomeScreen");
  };

  render() {
    const { localization } = this.state;
    const { navigation } = this.props;

    return (
      <Container>
        <ImageBackground
          style={{ flex: 1 }}
          source={require("../assets/shutterstock_483310882-3.jpg")}
        >
          <Card
            transparent
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              
             // height: 150,
             // marginTop: 250,
              paddingRight: 30,
              paddingLeft: 30,
             // marginBottom: 25,
              borderBottomColor: "white"
              
            }}
          >
            <CardItem>
              <Body style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center"}}>
                <Item style={{ borderBottomWidth: 0 }}>
                  <Image
                    style={{ alignItems: "center" }}
                    source={require("../assets/logo2.jpg")}
                  />
                </Item>

                <Item style={{ borderBottomWidth: 0 ,marginBottom:5}}>
                  <Text style={{fontSize:18,fontWeight:"bold"}}>
                    {navigation.getParam("language") === "en"
                      ? locale.en.confirmAppointmentTitle
                      : locale.fr.confirmAppointmentTitle}
                  </Text>
                </Item>
                <Item style={{ borderBottomWidth: 0 }}>
                  <Text>
                    {navigation.getParam("language") === "en"
                      ? locale.en.confirmAppointmentMessage
                      : locale.fr.confirmAppointmentMessage}
                  </Text>
                </Item>
               
                <Item style={{ borderBottomWidth: 0 }}>
                    
                    <Button
                      transparent={true}
                      style={{
                        
                      }}
                      // rounded
                      // warning
                      onPress={this.backtoLogin}
                    >
                      <Text style={{ color: "red"}}>
                        {localization === "en"
                          ? locale.en.backToLogin
                          : locale.fr.backToLogin}
                      </Text>
                    </Button>
                  </Item>
              </Body>
            </CardItem>
          </Card>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "orange",
  },
});

export default ConfirmAppointmentScreen;
