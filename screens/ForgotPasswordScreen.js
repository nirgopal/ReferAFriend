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

class PasswordScreen extends React.Component {
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

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  handleSubmit = () => {
    const { navigation } = this.props;
    const { name } = this.state;
    if (name === null) {
      navigation.getParam("language") === "en"
        ? this.setState({ nameError: locale.en.required })
        : this.setState({ nameError: locale.fr.required });
    }
    
    if(name !==null)   
    if (this.validateEmail(name) ){
    navigation.navigate("PasswordConfirmScreen", {language: this.state.localization}) }
    else{
      navigation.getParam("language") === "en"
        ? this.setState({ nameError: locale.en.invalidEmail })
        : this.setState({ nameError: locale.fr.invalidEmail});
    }
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
              flex:1,
              display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
              alignContent: "center",
              
              paddingRight: 30,
              paddingLeft: 30,
              marginBottom: 25,
              borderBottomColor: "white"
              
            }}
          >
            <CardItem>
              <Body style={{
                  display:'flex',
                  alignItems: 'center',
                   justifyContent: 'center',
                   alignContent: "center"}}>
                <Item style={{ borderBottomWidth: 0 }}>
                  <Image
                    style={{ alignItems: "center" }}
                    source={require("../assets/logo2.jpg")}
                  />
                </Item>

                <Item style={{ borderBottomWidth: 0 }}>
                  <Text style={{fontSize:20 , fontWeight:"bold",marginTop:5,
                }}> 
                    {navigation.getParam("language") === "en"
                      ? locale.en.forgotPassword
                      : locale.fr.forgotPassword}
                  </Text>
                </Item>
                <Item
                  style={{
                    backgroundColor: "white",
                    width: 300,
                    marginBottom: 10,
                    marginTop: 5,
                    borderColor: "black",
                  }}
                  rounded
                >
                  <Icon
                    style={{ color: "black" }}
                    active
                    name="mail"
                  />

                  <Input
                    style={{ color: "black" }}
                    placeholder={
                      navigation.getParam("language") === "en"
                        ? locale.en.email
                        : locale.fr.email
                    }
                    placeholderTextColor={"black"}
                    onChangeText={(name) =>
                      this.setState({ name: name }, () =>
                        this.setState({ nameError: null })
                      )
                    }
                  />
                </Item>
                {this.state.nameError && (
                  <Item style={{ borderBottomWidth: 0, padding: 5 }}>
                    <Text style={{ color: "red" }}>{this.state.nameError}</Text>
                  </Item>
                )}
                

                <Item style={{ borderBottomWidth: 0 }}>
                  <Button
                    style={{
                      backgroundColor: "#C4262E",
                      width: 200,
                      marginBottom: 10,
                      marginTop: 10,
                      borderColor: "black",
                      marginLeft:40
                    }}
                    rounded
                    warning
                    onPress={this.handleSubmit}
                  >
                    
                    <Text style={{ color: "white", marginLeft:35,
                  fontWeight:"bold"}}>
                      {navigation.getParam("language") === "en"
                        ? locale.en.submitButton
                        : locale.fr.submitButton}
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

export default PasswordScreen;
