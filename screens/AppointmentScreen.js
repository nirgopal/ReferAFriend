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
  CheckBox
} from "native-base";
import locale from "../locales";

class AppointmentScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      locale: null,
    };
  }
  componentDidMount() {
    this.setState({ name: null });
    this.setState({ phone: null });
    this.setState({ email: null });
    this.setState({ nameError: null });
    this.setState({ phoneError: null });
    this.setState({ emailError: null });
    this.setState({ invalidPhone: false });
    this.setState({time: null});
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
    const { name, phone, email, invalidPhone } = this.state;
    if (name === null) {
      navigation.getParam("language") === "en"
        ? this.setState({ nameError: locale.en.required })
        : this.setState({ nameError: locale.fr.required });
    }
    if (phone === null) {
      navigation.getParam("language") === "en"
        ? this.setState({ phoneError: locale.en.required })
        : this.setState({ phoneError: locale.fr.required });
    }
    if (phone !== null) {
      if (phone.match(/\d/g).length !== 10) {
        this.setState({ invalidPhone: true });
        navigation.getParam("language") === "en"
          ? this.setState({ phoneError: locale.en.invalidNumber })
          : this.setState({ phoneError: locale.fr.invalidNumber });
      }
    }
    if (email === null) {
      navigation.getParam("language") === "en"
        ? this.setState({ emailError: locale.en.required })
        : this.setState({ emailError: locale.fr.required });
    }

    if (email!== null) {
      if(!this.validateEmail(email)){
      navigation.getParam("language") === "en"
        ? this.setState({ emailError: locale.en.invalidEmail}):
        this.setState({ emailError: locale.fr.invalidEmail})
    }
  }
    
      if (name !== null && phone !== null && phone.match(/\d/g).length === 10&& email !== null) {
        navigation.navigate("ConfirmAppointmentScreen", {
          Name: this.state.name,
          Phone: this.state.phone,
          Rep: this.state.rep,
          language: this.state.localization,
        });
      }
    
  };


  render() {
    const { localization , time } = this.state;
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
              <Body style style={{
             display:'flex',
             alignItems: 'center',
              justifyContent: 'center',
              alignContent: "center",
             // marginRight:350
            
          }}>
                <Item style={{ borderBottomWidth: 0 }}>
                  <Image
                    style={{ alignItems: "center"}}
                    source={require("../assets/logo2.jpg")}
                  />
                </Item>

                <Item style={{ borderBottomWidth: 0 }}>
                  <Text style={{fontFamily:"Arial"}}>
                    {navigation.getParam("language") === "en"
                      ? locale.en.appointmentTitle
                      : locale.fr.appointmentTitle}
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
                    name="person-circle-outline"
                  />

                  <Input 
                    style={{ color: "black" ,fontFamily:"Arial"}}
                    placeholder={
                      navigation.getParam("language") === "en"
                        ? locale.en.nameLabel
                        : locale.fr.nameLabel
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
                    <Text style={{ color: "red" ,fontFamily:"Arial"}}>{this.state.nameError}</Text>
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
                    name="phone"
                    type="AntDesign"
                  />

                  <Input
                    style={{ color: "black" ,fontFamily:"Arial"}}
                    placeholder={
                      navigation.getParam("language") === "en"
                        ? locale.en.phoneLabel
                        : locale.fr.phoneLabel
                    }
                    keyboardType='numeric'
                    placeholderTextColor={"black"}
                    onChangeText={(phone) =>
                      this.setState({ phone: phone }, () =>
                        this.setState({ phoneError: null })
                      )
                    }
                  />
                </Item>
                {this.state.phoneError && (
                  <Item style={{ borderBottomWidth: 0, padding: 5 }}>
                    <Text style={{ color: "red",fontFamily:"Arial" }}>
                      {this.state.phoneError}
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
                    name="mail"
                  />

                  <Input
                    style={{ color: "black" ,fontFamily:"Arial"}}
                    placeholder={
                      navigation.getParam("language") === "en"
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
                    <Item style={{ borderBottomWidth: 0 }}>
                  <Text style={{fontFamily:"Arial"}}>
                    {navigation.getParam("language") === "en"
                      ? locale.en.timeMessage
                      : locale.fr.timeMessage}
                  </Text>
                </Item>

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
                      checked={this.state.time === "am" ? true : false}
                      onPress={() =>
                        this.state.time === "am"
                          ? this.setState({ time: "pm" })
                          : this.setState({ time: "am" })
                      }
                    />
                    <Text style={{ paddingRight: 40 ,fontFamily:"Arial"}}>AM</Text>

                    <CheckBox
                      style={{ marginRight: 20 }}
                      color="#C4262E"
                      borderColor="black"
                      checked={this.state.time === "pm" ? true : false}
                      onPress={() =>
                        this.state.time === "pm"
                          ? this.setState({ time: "am" })
                          : this.setState({ time: "pm" })
                      }
                    />
                    <Text style={{ color: "black" ,fontFamily:"Arial"}}>PM</Text>
                  </Item>

                <Item style={{ borderBottomWidth: 0 ,fontFamily:"Arial"}}>
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
                    onPress={this.handleSubmit}
                  >
                    <Icon
                      style={{ color: "black" }}
                      active
                      name="user"
                      type="AntDesign"
                    />
                    <Text style={{ color: "white", marginLeft:-30 ,
                  fontWeight:"bold",fontFamily:"Arial"}}>
                      {navigation.getParam("language") === "en"
                        ? locale.en.appointmentButton
                        : locale.fr.appointmentButton}
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

export default AppointmentScreen;
