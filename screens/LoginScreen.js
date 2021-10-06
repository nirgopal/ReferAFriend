import React, { useState } from "react";
import { ImageBackground, StyleSheet, Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Card,
  CardItem,
  Body,
  Icon,
  Item,
  Input,
  Radio,
  Left,
  Right,
  CheckBox,
  Box,
  Modal
} from "native-base";
import locale from "../locales";


class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      locale: null,
    };
  }
  componentDidMount() {
    this.setState({ localization: "fr" });
    this.setState({ customer: "existing" });
    this.setState({ referral: "share" });
    this.setState({ name: null });
    this.setState({ phone: null });
    this.setState({ email: null });
    this.setState({ password: null });
    this.setState({ emailError: null });
    this.setState({ passwordError: null });
    this.setState({loginError: null});
    this.setState({openModal : false});
  }



  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }
  handleLogin = () => {
    const { localization  , email , password} = this.state;
    const { navigation } = this.props;
    if(email === null) {
      localization === "en" ? this.setState({ emailError: locale.en.required}):
      this.setState({ emailError: locale.fr.required})
    }
    if(password === null) {
      localization === "en" ? this.setState({ passwordError: locale.en.required}):
      this.setState({ passwordError: locale.fr.required})
    } 
    
    if (email !== null && password !==null){
      if(this.validateEmail(email)){
        if((email === "garde-manger@gmail.com" || email === "Garde-manger@gmail.com" )&& password === "Welcome01"){
          navigation.navigate("AccountScreen", {language: this.state.localization});
        }
        else{
      localization === "en"  ? this.setState({ loginError: locale.en.loginFailed}):
      this.setState({ loginError: locale.fr.loginFailed})
        }
      }
      else {
        localization === "en" ? this.setState({ emailError: locale.en.invalidEmail}):
      this.setState({ emailError: locale.fr.invalidEmail})
      }

    }
  }


  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  forgotPassword = () => {
    const { navigation } = this.props;
    navigation.navigate("PasswordScreen", {language: this.state.localization});
  }

  shareContacts = () => {
    const { navigation } = this.props;
    navigation.navigate("WelcomeScreen", {language: this.state.localization});
  }

  registerNow = () => {
    const { navigation } = this.props;
    navigation.navigate("RegisterScreen", {language: this.state.localization});
  }

  

  render() {
    const { localization } = this.state;

    return (
      <Container>
        <ImageBackground
          style={{ flex: 1 }}
          source={require("../assets/shutterstock_483310882-3.jpg")}
        >
          
            <Card transparent
            
              style={{
                flex:1,
                display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
                alignContent: "center",
                //height: 100,
                //marginTop:150,
                paddingRight:30,
                paddingLeft:30,
                borderBottomColor: "white",
              }}
            >
              

              <CardItem
               
              >
                <Body
                style={{
                  display:'flex',
                  alignItems: 'center',
                   justifyContent: 'center',
                   alignContent: "center"}}>
                  <Item style ={{borderBottomWidth: 0}}> 
                  <Image
                style={{ alignItems: "center", justifyContent: 'center',
                alignSelf:"auto" }}
                source={require("../assets/logo2.jpg")}
              />
                    </Item>
                  
                        
                  <Item
                    style={{
                      backgroundColor: "white",
                      width: 300,
                      marginBottom: 10,
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
                      style={{ color: "black" , fontFamily:"Arial"}}
                      placeholder={
                        localization === "en"
                          ? locale.en.email
                          : locale.fr.email
                      }
                      placeholderTextColor={"black"}
                      onChangeText={(email) =>
                        (this.setState({ email: email },
                         () => this.setState({emailError:null})))
                      }
                    />
                  </Item>
                  {this.state.emailError && (
                       <Item style={{ borderBottomWidth: 0 ,padding:5}}>
                       <Text style={{ color: "red" ,fontFamily:"Arial"}}>
                       {this.state.emailError}
                       </Text>
                       </Item>
                    )}
                  <Item
                    style={{
                      backgroundColor: "white",
                      width: 300,
                      marginBottom: 10,
                      borderColor: "black",
                    }}
                    rounded
                  >
                    <Icon
                      style={{ color: "black" }}
                      active
                      name="lock"
                      type="AntDesign"
                    />
                    <Input
                      style={{ color: "black" ,fontFamily:"Arial"}}
                      secureTextEntry={true}
                      placeholder={
                        localization === "en"
                          ? locale.en.password
                          : locale.fr.password
                      }
                      placeholderTextColor={"black"}
                      onChangeText={(password) =>
                        (this.setState({ password: password },
                         () => this.setState({passwordError:null})))
                      }
                       
                    />
                    
                  </Item>
                  {this.state.passwordError && (
                       <Item style={{ borderBottomWidth: 0 ,padding:5}}>
                       <Text style={{ color: "red" ,fontFamily:"Arial"}}>
                       {this.state.passwordError}
                       </Text>
                       </Item>
                    )}
                  
                  <Item
                    style={{
                      paddingBottom: 2,
                      paddingTop: 5,
                      paddingHorizontal: 50,
                      borderBottomWidth: 0,
                    }}
                  >
                    <CheckBox
                      style={{ marginRight: 20 }}
                      color="#C4262E"
                      borderColor="black"
                      checked={this.state.localization === "en" ? true : false}
                      onPress={() =>
                        this.state.localization === "en"
                          ? this.setState({ localization: "fr" })
                          : this.setState({ localization: "en" })
                      }
                    />
                    <Text style={{ paddingRight: 40 ,fontFamily:"Arial"}}>EN</Text>

                    <CheckBox
                      style={{ marginRight: 20 }}
                      color="#C4262E"
                      borderColor="black"
                      checked={this.state.localization === "fr" ? true : false}
                      onPress={() =>
                        this.state.localization === "fr"
                          ? this.setState({ localization: "en" })
                          : this.setState({ localization: "fr" })
                      }
                    />
                    <Text style={{ color: "black" ,fontFamily:"Arial"}}>FR</Text>
                  </Item>
                  <Item style={{ borderBottomWidth: 0 }}>
                    <Button
                      style={{
                        backgroundColor: "#C4262E",
                        width: 300,
                        
                        marginTop: 10,
                        borderColor: "black",
                      }}
                      rounded
                      warning
                      onPress={this.handleLogin}
                    >
                      <Icon
                        style={{ color: "black" }}
                        active
                        name="login"
                        type="AntDesign"
                      />
                      <Text style={{ color: "white",fontWeight:"bold", fontFamily:"Arial",marginRight:100 }}>
                        {localization === "en"
                          ? locale.en.login
                          : locale.fr.login}
                      </Text>
                    </Button>
                  </Item>
                  {this.state.loginError && (
                       <Item style={{ borderBottomWidth: 0 ,padding:5}}>
                       <Text style={{ color: "red" ,fontFamily:"Arial"}}>
                       {this.state.loginError}
                       </Text>
                       </Item>
                    )}

                  <Item style={{ borderBottomWidth: 0 }}>
                    <Text style={{ color: "grey" ,fontSize:18,fontFamily:"Arial"}}>
                      {localization === "en"
                        ? locale.en.forgotPassword
                        : locale.fr.forgotPassword}
                    </Text>
                    <Button
                      transparent={true}
                      style={{
                        
                      }}
                      
                      onPress={this.forgotPassword}
                    >
                      <Text style={{ color: "red",fontSize:18,
                      fontWeight:"bold",fontFamily:"Arial",marginLeft:-15}}>
                        {localization === "en"
                          ? locale.en.clickHere
                          : locale.fr.clickHere}
                      </Text>
                    </Button>
                  </Item>
                  <Item style={{ borderBottomWidth: 0 }}>
                    
                    <Button
                      style={{
                        
                        backgroundColor: "#C4262E",
                        width: 300,
                        marginBottom: 10,
                        marginTop: 10,
                        borderColor: "black",
                      }}
                      rounded
                      warning
                      onPress={this.registerNow}
                    >
                      <Icon
                        style={{ color: "black" }}
                        active
                        name="shoppingcart"
                        type="AntDesign"
                      />
                      <Text style={{ color: "white", 
                    fontSize:18, fontWeight:"bold",fontFamily:"Arial",
                    marginRight:60
                    
                    }}>
                        {localization === "en"
                          ? locale.en.order
                          : locale.fr.order}
                      </Text>
                    </Button>
                  </Item>
                  <Item style={{ borderBottomWidth: 0 }}>
                    <Button
                      style={{
                       // flex:1,
                //display: 'flex',
                        backgroundColor: "#C4262E",
                        width: 300,
                        marginBottom: 10,
                        marginTop: 10,
                        borderColor: "black",
                      }}
                      rounded
                      warning
                      onPress={this.shareContacts}
                    >
                      <Icon
                        style={{ color: "black" }}
                        active
                        name="persons"
                        type="Fontisto"
                      />
                      <Text style={{ color: "white", marginLeft:-30,fontWeight:"bold" , fontFamily:"Arial" }}>
                        {localization === "en"
                          ? locale.en.share
                          : locale.fr.share}
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

export default LoginScreen;
