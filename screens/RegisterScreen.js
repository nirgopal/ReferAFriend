import React from "react";
import { ImageBackground, StyleSheet, Image ,Linking} from "react-native";
import {
  Container,
  Button,
  Text,
  Card,
  CardItem,
  Body,
  Icon,
  Item,
  Input
} from "native-base";
import locale from "../locales";
import { TouchableOpacity } from "react-native-gesture-handler";

class RegisterScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      locale: null,
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    this.setState({ name: null });
    this.setState({ phone: null });
    this.setState({ rep: null });
    this.setState({ nameError: null });
    this.setState({ phoneError: null });
    this.setState({ repError: null });
    this.setState({ invalidPhone: false });
    this.setState({ localization: navigation.getParam("language") });
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }


dialCall = () => {
 
    let phoneNumber = '';
 
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${18005936003}';
    }
    else {
      phoneNumber = 'telprompt:${18005936003}';
    }
 
    Linking.openURL(phoneNumber);
  };

  backtoLogin = () => {
    const { navigation } = this.props;

    navigation.navigate("LoginScreen", {});
  };

  scheduleNow = () => {
    const { navigation } = this.props;

    navigation.navigate("AppointmentScreen", {
      language: this.state.localization,
    });
  };

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

              paddingRight: 30,
              paddingLeft: 30,
             
              borderBottomColor: "white",
            }}
          >
            <CardItem>
              <Body style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center" }}>
                <Item style={{ borderBottomWidth: 0 }}>
                  <Image
                    style={{ alignItems: "center" }}
                    source={require("../assets/logo2.jpg")}
                  />
                </Item>

                <Item style={{ borderBottomWidth: 0, marginBottom: 5 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 20,
                     // marginLeft: 10,
                      marginTop: 10,
                    }}
                  >
                    {navigation.getParam("language") === "en"
                      ? locale.en.registerTitle
                      : locale.fr.registerTitle}
                  </Text>
                </Item>
                <Item
                  style={{
                    borderBottomWidth: 0,
                    marginBottom: 10,
                    marginTop: 10,
                  }}
                >
                  <Icon
                    style={{ color: "red" }}
                    active
                    name="phone"
                    type="AntDesign"
                  />
                  <Text style={{ display: "flex"  }}>
                    {navigation.getParam("language") === "en"
                      ? locale.en.contactusMessage
                      : locale.fr.contactusMessage}

<Text style={{ color: "red" }} onPress={this.dialCall}>
                    {navigation.getParam("language") === "en"
                      ? locale.en.contactusMessageNumber
                      : locale.fr.contactusMessageNumber}
                    </Text>
                    <Text >
                    {navigation.getParam("language") === "en"
                      ? " "+ locale.en.contactusMessage02
                      : " "+locale.fr.contactusMessagePart2}
                    </Text>
                    <Text style={{ color: "red" ,fontWeight:"bold"}} onPress={this.scheduleNow}>
                    {navigation.getParam("language") === "en"
                      ? " "+ locale.en.registerLink
                      : " "+locale.fr.registerLink}
                    </Text>
                  </Text>
                </Item>

                <Item
                  style={{
                    borderBottomWidth: 0,
                    marginBottom: 20,
                   //marginRight: 20,
                  }}
                >
                  <Icon
                    style={{ color: "red" }}
                    active
                    name="wechat"
                    type="AntDesign"
                  />
                  <Text>
                    {navigation.getParam("language") === "en"
                      ? locale.en.adviseMessage
                      : locale.fr.adviseMessage}
                  </Text>
                </Item>
                <Item
                  style={{
                    borderBottomWidth: 0,
                    marginBottom: 20,
                   // marginRight: 20,
                  }}
                >
                  <Icon
                    style={{ color: "red" }}
                    active
                    name="shoppingcart"
                    type="AntDesign"
                  />
                  <Text>
                    {navigation.getParam("language") === "en"
                      ? locale.en.orderMessage
                      : locale.fr.orderMessage}
                  </Text>
                </Item>
                <Item style={{ borderBottomWidth: 0 ,marginLeft:-9}}>
                  <Icon
                    style={{ color: "red" }}
                    active
                    name="truck"
                    type="FontAwesome"
                  />
                  <Text>
                    {navigation.getParam("language") === "en"
                      ? locale.en.deliveryMessage
                      : locale.fr.deliveryMessage}
                  </Text>
                </Item>

                <Item style={{ borderBottomWidth: 0 }}>
                  <Button
                    style={{
                      backgroundColor: "#C4262E",
                      width: 250,
                      marginBottom: 10,
                      marginTop: 10,
                      borderColor: "black",
                    }}
                    rounded
                    warning
                    onPress={this.backtoLogin}
                  >
                    <Text
                      style={{
                        color: "white",
                       marginLeft: 30,
                        fontWeight: "bold",
                      }}
                    >
                      {navigation.getParam("language") === "en"
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

export default RegisterScreen;
