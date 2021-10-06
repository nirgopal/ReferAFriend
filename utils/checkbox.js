import React, { useState } from "react";
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



class WelcomeScreen extends React.Component {
    render(){
return(
    
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
  
); 
    }
};