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

class WelcomeScreen extends React.Component {
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

  handleSubmit = () => {
    const { navigation } = this.props;
    const { name, phone, rep, invalidPhone } = this.state;
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
    if (rep === null) {
      navigation.getParam("language") === "en"
        ? this.setState({ repError: locale.en.required })
        : this.setState({ repError: locale.fr.required });
    }

    if (
      name !== null &&
      phone !== null &&
      phone.match(/\d/g).length === 10 &&
      rep !== null
    ) {
      navigation.navigate("ContactList", {
        Name: this.state.name,
        Phone: this.state.phone,
        Rep: this.state.rep,
        language: this.state.localization,
      });
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
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              //height: 100,
              //marginTop:150,
              paddingRight: 30,
              paddingLeft: 30,
              borderBottomColor: "white",
            }}
          >
            <CardItem
              style={{
                //display:'flex',
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                // marginRight:350
              }}
            >
              <Body
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Item style={{ borderBottomWidth: 0 }}>
                  <Image
                    style={{ alignItems: "center" }}
                    source={require("../assets/logo2.jpg")}
                  />
                </Item>

                <Item style={{ borderBottomWidth: 0 }}>
                  <Text style={{ fontFamily: "Arial" }}>
                    {navigation.getParam("language") === "en"
                      ? locale.en.welcomeText
                      : locale.fr.welcomeText}
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
                    style={{ color: "black", fontFamily: "Arial" }}
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
                    <Text style={{ color: "red", fontFamily: "Arial" }}>
                      {this.state.nameError}
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
                    name="phone"
                    type="AntDesign"
                  />

                  <Input
                    style={{ color: "black", fontFamily: "Arial" }}
                    placeholder={
                      navigation.getParam("language") === "en"
                        ? locale.en.phoneLabel
                        : locale.fr.phoneLabel
                    }
                    keyboardType="numeric"
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
                    <Text style={{ color: "red", fontFamily: "Arial" }}>
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
                    name="person-circle-outline"
                  />

                  <Input
                    style={{ color: "black", fontFamily: "Arial" }}
                    placeholder={
                      navigation.getParam("language") === "en"
                        ? locale.en.rep
                        : locale.fr.rep
                    }
                    placeholderTextColor={"black"}
                    onChangeText={(rep) =>
                      this.setState({ rep: rep }, () =>
                        this.setState({ repError: null })
                      )
                    }
                  />
                </Item>
                {this.state.repError && (
                  <Item
                    style={{
                      borderBottomWidth: 0,
                      padding: 5,
                      fontFamily: "Arial",
                    }}
                  >
                    <Text style={{ color: "red" }}>{this.state.repError}</Text>
                  </Item>
                )}

                <Item style={{ borderBottomWidth: 0, fontFamily: "Arial" }}>
                  <Button
                    style={{
                      backgroundColor: "#C4262E",

                      borderColor: "black",
                    }}
                    rounded
                    warning
                    onPress={this.handleSubmit}
                  >
                    <Icon
                      style={{ color: "black", alignSelf: "auto" }}
                      active
                      name="user"
                      type="AntDesign"
                    />
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontFamily: "Arial",
                      }}
                    >
                      {navigation.getParam("language") === "en"
                        ? locale.en.referButton
                        : locale.fr.referButton}
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

export default WelcomeScreen;
