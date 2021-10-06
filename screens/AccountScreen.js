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
  Modal,
} from "native-base";
import locale from "../locales";
import { Formik } from "formik";
import * as yup from "yup";
import email from "react-native-email";
import { event } from "react-native-reanimated";
import { locales } from "expo-localization";

class AccountScreen extends React.Component {
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
    this.setState({ loginError: null });
    this.setState({ openModal: false });
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }
 
  

  homePage = () => {
    const { navigation } = this.props;
    navigation.navigate("LoginScreen", {
      language: this.state.localization,
    });
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
               style={{
               //display:'flex',
               alignItems: 'center',
                justifyContent: 'center',
                alignContent: "center",
               // marginRight:350
              
            }}>
              <Body
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
              }}>
              <Item style ={{borderBottomWidth: 0}}> 
          
        <Image
          style={{ alignItems: "center", marginLeft: 75 }}
          source={require("../assets/logo2.jpg")}
        />
        </Item>
        
        <Item >
        
              <Left>
        <Text style={{ fontFamily:"Arial"}}>
          Demo User
          </Text>
</Left>
          {navigation.getParam("language") === "en" &&
          
          <Right>
          <Button
          transparent={true}
          style={{ fontFamily:"Arial"}}
          onPress={this.homePage}
          
        >
          <Text style={{ color: "red", 
         fontWeight:"bold",fontFamily:"Arial",
        }}>
            
            
              Sign Out
              
              
          </Text>
        </Button>
        </Right>
        }
        
        {navigation.getParam("language") === "fr" &&
        <Right>
          <Button
                      transparent={true}
                      style={{fontFamily:"Arial"}}
                      onPress={this.homePage}
                    >
                      <Text style={{ color: "red", 
                    fontSize:18, fontWeight:"bold",fontFamily:"Arial"
                    
                    }}>
                        
                          Déconnexion
                      </Text>
                    </Button> 
                    </Right>}
          </Item>
                  

      
        {/* <Card
          transparent
          style={{
            alignContent: "center",
            height: 200,
            marginTop: 10,
          }}
        >
          <CardItem style={{ backgroundColor: "#E3DBE4" }}>
            <Body> */}
              <Item
                style={{
                  backgroundColor: "#0DA21F",
                  width: 290,
                  height: 70,
                  marginBottom: 10,
                  marginTop:20,
          
                  borderLeft: "#38761B",
                  borderBottomWidth: 0,
                }}
                rounded
              >
                
                  <Icon
                    style={{ color: "white", fontSize: 50}}
                    active
                    name="dollar"
                    type="FontAwesome"
                  />
                

                <Item
                  style={{
                    flex: 1,
                    flexDirection: "inline",
                    borderBottomWidth: 0,
                    paddingTop: 10,
                    marginTop:-30
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Arial",
                      fontWeight: "bold",
                      marginLeft: -50,
                      
                    }}
                  >
                    {navigation.getParam("language") === "en"
                      ? "PAYMENTS REMAINING"
                      : "PAIEMENTS RESTANTS"}
                  </Text>

                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Arial",
                      fontWeight: "bold",
                      marginLeft: -100,
                      marginTop: 10,
                    }}
                  >
                    {navigation.getParam("language") === "en" ? "10" : "10"}
                  </Text>
                  
                  
                </Item>
              </Item>
              <Item
                style={{
                  backgroundColor: "#0CDDF2",
                  width: 290,
                  height: 70,
                  marginBottom: 10,
                  marginTop:10,
                }}
                rounded
              >
                
                  <Icon
                    style={{ color: "white", fontSize: 50 }}
                    active
                    name="check"
                    type="FontAwesome"
                  />
                

                <Item
                  style={{
                    flex: 1,
                    flexDirection: "inline",
                    borderBottomWidth: 0,
                    paddingTop: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Arial",
                      fontWeight: "bold",
                      marginLeft: -50,
                      marginTop: -30,
                      
                    }}
                  >
                    {navigation.getParam("language") === "en"
                      ? "PAYMENTS MADE"
                      : "PAIEMENTS EFFECTUÉS"}
                  </Text>

                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Arial",
                      fontWeight: "bold",
                      marginLeft: -100,
                      
                      
                    }}
                  >
                    {navigation.getParam("language") === "en" ? "2" : "2"}
                  </Text>
                  
                </Item>
              </Item>
              <Item
                style={{
                  backgroundColor: "#F2630C",
                  width: 290,
                  height: 70,
                  marginBottom: 10,
                  marginTop:10,
                }}
                rounded
              >
                
                
                  <Icon
                    style={{ color: "white", fontSize: 50,
                   }}
                    active
                    name="person"
                    type="Ionicons"
                  />
               
               

                <Item
                  style={{
                    flex: 1,
                    flexDirection: "inline",
                    borderBottomWidth: 0,
                    paddingTop: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Arial",
                      fontWeight: "bold",
                      marginLeft: -50,
                      marginTop: -30,
                    }}
                  >
                    {navigation.getParam("language") === "en"
                      ? "CLIENT"
                      : "CLIENT"}
                  </Text>

                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Arial",
                      fontWeight: "bold",
                      marginLeft: -50,
                      marginTop: 10,
                    }}
                  >
                    {navigation.getParam("language") === "en" ? "1234" : "1234"}
                  </Text>
                  
                </Item>
              </Item>
              <Item
                style={{
                  backgroundColor: "#DD0CF2",
                  width: 290,
                  height: 70,
                  marginBottom: 10,
                  marginTop:10,
                }}
                rounded
              >
                
                
                  <Icon
                    style={{ color: "white", fontSize: 50
                   }}
                    active
                    name="calendar"
                    
                  />
               
               

                <Item
                  style={{
                    flex: 1,
                    flexDirection: "inline",
                    borderBottomWidth: 0,
                    paddingTop: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Arial",
                      fontWeight: "bold",
                      marginLeft: -50,
                      marginTop: -30,
                    }}
                  >
                    {navigation.getParam("language") === "en"
                      ? "NEXT PAYMENT"
                      : "PROCHAINE PAIEMENT"}
                  </Text>

                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Arial",
                      fontWeight: "bold",
                      marginLeft: -50,
                      marginTop: 10,
                    }}
                  >
                    {navigation.getParam("language") === "en"
                      ? "15 October 2021"
                      : "15 October 2021"}
                  </Text>
                  
                </Item>
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

export default AccountScreen;
