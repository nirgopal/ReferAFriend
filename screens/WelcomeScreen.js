import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet, 
  Image  
} from "react-native";
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
  CheckBox
} from "native-base";
import locale from "../locales";
import { Formik } from "formik";
import * as yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

let ReviewSchema;

class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      locale: null,
    };
  }
  componentDidMount() {
    this.setState({ localization: "fr" });
    ReviewSchema = yup.object({
      phoneNumber: yup
        .string()
        .required(
          this.state.localization === "en"
            ? locale.en.required
            : locale.fr.required
        )
        .min(
          10,
          this.state.localization === "en"
            ? locale.en.shortNumber
            : locale.fr.shortNumber
        )
        .max(
          10,
          this.state.localization === "en"
            ? locale.en.longNumber
            : locale.fr.longNumber
        )
        .matches(
          phoneRegExp,
          this.state.localization === "en"
            ? locale.en.invalidNumber
            : locale.fr.invalidNumber
        ),
    });
  }

  componentDidUpdate() {
    ReviewSchema = yup.object({
      phoneNumber: yup
        .string()
        .required(
          this.state.localization === "en"
            ? locale.en.required
            : locale.fr.required
        )
        .min(
          10,
          this.state.localization === "en"
            ? locale.en.shortNumber
            : locale.fr.shortNumber
        )
        .max(
          10,
          this.state.localization === "en"
            ? locale.en.longNumber
            : locale.fr.longNumber
        )
        .matches(
          phoneRegExp,
          this.state.localization === "en"
            ? locale.en.invalidNumber
            : locale.fr.invalidNumber
        ),
        firstName: yup
        .string()
        .required(
          this.state.localization === "en"
            ? locale.en.required
            : locale.fr.required
        ),
        repName:yup
        .string().required(
          this.state.localization === "en"
            ? locale.en.required
            : locale.fr.required
        )

    });
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state,callback)=>{
        return;
    };
}
  pressHandlerForForm = (values) => {
    console.log(values);
    const { navigation } = this.props;
    navigation.navigate("ContactList");
  };

  render() {
    const { localization } = this.state;
    return (
      <Container>
        <ImageBackground
          style={{ flex: 1 }}
          source={require("../assets/shutterstock_483310882-3.jpg")}
        >
          <Image
            style={{ alignItems: "center", marginLeft: 120 }}
            source={require("../assets/logo2.jpg")}
          />
          <Formik
            initialValues={{
              firstName: "",
              phoneNumber: "",
              repName:"",
            }}
            validationSchema={ReviewSchema}
            onSubmit={(values ) => {
              
              const { navigation } = this.props;
              navigation.navigate("ContactList", {
                Name: values.firstName,
                Phone: values.phoneNumber,
                Rep: values.repName,
                language: this.state.localization,
              });
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <Content
                contentContainerStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 50,
                  paddingHorizontal: 125,
                }}
              >
                <Item>
                    <Text style={{color:"red",justifyContent:"center"}}>{locale.fr.welcomeText}</Text>
                  </Item>
                <Item style={{ paddingBottom: 10  }}>
                  <CheckBox 
                    style={{ marginRight: 20}}
                    color="#C4262E"           
                    borderColor="black"
                    checked={this.state.localization === "en" ? true : false}
                    onPress={() =>
                      this.state.localization === "en"
                        ? this.setState({ localization: "fr" })
                        : this.setState({ localization: "en" })
                    }
                  />
                  <Text style={{ paddingRight: 40, color: "Black" }}>EN</Text>

                  <CheckBox
                    style={{ marginRight: 20}}
                    color="#C4262E"           
                    borderColor="black"
                    checked={this.state.localization === "fr" ? true : false}
                    onPress={() =>
                      this.state.localization === "fr"
                        ? this.setState({ localization: "en" })
                        : this.setState({ localization: "fr" })
                    }
                  />
                  <Text style={{  color: "Black" }}>FR</Text>
                </Item>
                <Item
                  style={{
                    backgroundColor: "#C4262E",
                    width: 200,
                    marginBottom: 10,
                    borderColor: "black"
                  }}
                  rounded
                >
                  <Icon
                    style={{ color: "black" }}
                    active
                    name="person-circle-outline"
                  />
                  <Input
                    style={{ color: "black" }}
                    placeholder={
                      localization === "en"
                        ? locale.en.nameLabel
                        : locale.fr.nameLabel
                    }
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                  />
                </Item>
                 <Item>
                  {touched.firstName && errors.firstName && (
                    <Text style={{ backgroundColor: "red" }}>
                      {" "}
                      {errors.firstName}{" "}
                    </Text>
                  )}
                </Item>
                <Item
                  style={{
                    backgroundColor: "#C4262E",
                   width: 200,
                    marginBottom: 10,
                    borderColor: "black"
                  }}
                  rounded
                  success
                >
                  <Icon style={{ color: "black" }} active name="call-outline" />
                  <Input 
                   
                    placeholder={
                      localization === "en"
                        ? locale.en.phoneLabel
                        : locale.fr.phoneLabel
                    }
                    keyboardType='numeric'
                    onChangeText={handleChange("phoneNumber")}
                    onBlur={handleBlur("phoneNumber")}
                    maxLength={10}
                  />
                  {/* <Item style={{ paddingBottom:5}}>
              {touched.phoneNumber && errors.phoneNumber && 
              <Text style={{backgroundColor:"red" }}> {errors.phoneNumber} </Text>}
              </Item> */}
                  {touched.phoneNumber && errors.phoneNumber && (
                    <Right>
                      <Icon style={{ color: "red" }} name="close-circle" />
                    </Right>
                  )}
                </Item>
                <Item>
                  {touched.phoneNumber && errors.phoneNumber && (
                    <Text style={{ backgroundColor: "red" }}>
                      {" "}
                      {errors.phoneNumber}{" "}
                    </Text>
                  )}
                </Item>
                <Item
                  style={{
                    backgroundColor: "#C4262E",
                    width: 200,
                    marginBottom: 10,
                    borderColor: "black",
                    marginTop: 10,
                  }}
                  rounded
                >
                  <Icon
                    style={{ color: "black" }}
                    active
                    name="person-circle-outline"
                  />
                  <Input
                    style={{ color: "black" }}
                    placeholder={
                      localization === "en"
                        ? locale.en.rep
                        : locale.fr.rep
                    }
                    onChangeText={handleChange("repName")}
                    onBlur={handleBlur("repName")}
                  />
                </Item>
                 <Item>
                  {touched.repName && errors.repName && (
                    <Text style={{ backgroundColor: "red" }}>
                      {" "}
                      {errors.repName}{" "}
                    </Text>
                  )}
                </Item>               

                <Item>
                  <Button
                    style={{
                      backgroundColor: "#C4262E",
                      width: 200,
                      marginBottom: 10,
                      marginTop: 10,
                      borderColor: "black"
                    }}
                    rounded
                    warning
                    onPress={handleSubmit}
                  >
                    <Icon
                      style={{ color: "black" }}
                      active
                      name="people-outline"
                    />
                    <Text style={{ color: "black", marginRight: 25 }}>
                      {localization === "en"
                        ? locale.en.referButton
                        : locale.fr.referButton}
                    </Text>
                  </Button>
                </Item>
              </Content>
            )}
          </Formik>
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
