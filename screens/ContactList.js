import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import * as Contacts from "expo-contacts";
import * as Permissions from "expo-permissions";
import {
  Header,
  ListItem,
  Text,
  Radio,
  Right,
  Left,
  List,
  Body,
  Item,
  Icon,
  Input,
  Button,
  CheckBox
} from "native-base";

import { TouchableOpacity } from "react-native-gesture-handler";
import email from "react-native-email";
import locale from "../locales";

class ContactList extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      contacts: [],
      selectedContacts: [],
      contactSelected: false,
    };
  }

  loadContacts = async () => {
    const permission = await Permissions.askAsync(Permissions.CONTACTS);

    if (permission.status !== "granted") {
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
    });

    data.map((info) => {
      info.check = false;
      return data;
    });

    this.setState({ contacts: data, inMemoryContacts: data, isLoading: false });
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.loadContacts();
  }

  press = (hey) => {
    this.state.contacts.map((item) => {
      if (item.id === hey.id) {
        item.check = !item.check;
        if (item.check === true) {
          this.state.selectedContacts.push(item);
        } else if (item.check === false) {
          const i = this.state.selectedContacts.indexOf(item);
          if (1 != -1) {
            this.state.selectedContacts.splice(i, 1);
            return this.state.selectedContacts;
          }
        }
      }
    });
    this.setState({ contacts: this.state.contacts });
  };

  contactList = [];
  formattedContactList = [];
  getContactList = (items) => {
    
    items.map((element) => {
      this.contactList.push("\n");
      element.firstName !== undefined &&
        this.contactList.push(element.firstName);
      element.lastName !== undefined && this.contactList.push(element.lastName);
      element.phoneNumbers &&
        element.phoneNumbers !== undefined &&
        element.phoneNumbers.length > 0 &&
        this.contactList.push(element.phoneNumbers[0].number);
      element.emails &&
        element.emails !== undefined &&
        element.emails.length > 0 &&
        this.contactList.push(element.emails[0].email);
      this.contactList.push("\n");
    });
    
    this.formattedContactList.push(this.contactList.join(' '));
    
  };

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ borderStyle: "solid", borderColor: "#ecf0f1" }}
        onPress={() => this.press(item)}
      >
        <ListItem>
          <Left>
            <Body>
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                {item.firstName + " "}
                {item.lastName}
              </Text>
            </Body>
            <Body>
              <Text>
                {item.phoneNumbers &&
                  item.phoneNumbers.length > 0 &&
                  item.phoneNumbers[0].number}
              </Text>
            </Body>
          </Left>

          <Right>
            <CheckBox
              color="green"           
              borderColor="black"
              checked={item.check ? true : false}
            />
          </Right>
        </ListItem>
      </TouchableOpacity>
    );
  };

  searchContacts = (value) => {
    const filteredContacts = this.state.inMemoryContacts.filter((contact) => {
      let contactLowercase = (
        contact.firstName +
        " " +
        contact.lastName
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ contacts: filteredContacts });
  };

  onPressAddContacts = () => {
    this.getContactList(this.state.selectedContacts);
    const { navigation } = this.props;

    const to = ["niranjanamoiz@gmail.com"]; // string or array of email addresses
    email(to, {
      subject:
        navigation.getParam("language") === "en"
          ? locale.en.referAFriend
          : locale.fr.referAFriend,

      body:
        navigation.getParam("language") === "en"
          ? navigation.getParam("Name") +
            " " +
            locale.en.emailBodyWithPhone +
            " " +
            navigation.getParam("Phone") +
            " " +
            locale.en.emailBody + 
            this.formattedContactList
          : navigation.getParam("Name") +
            " " +
            locale.fr.emailBodyWithPhone +
            " " +
            navigation.getParam("Phone") +
            " " +
            locale.fr.emailBody + 
            this.formattedContactList,
    }).catch(console.error);
    navigation.navigate("WelcomeScreen");
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView />

        <Header style={{ backgroundColor: "white", padding: 5 }}>
          <Item style={{ width: 170 }} searchBar rounded>
            <Icon name="ios-search" />
            <Input onChangeText={(value) => this.searchContacts(value)} />
            <Icon name="ios-people" />
          </Item>

          <Right>
            <Item style={{ padding: 5 }}>
              {this.state.selectedContacts.length > 0 && (
                <Button
                  rounded
                  success
                  onPress={() => this.onPressAddContacts()}
                >
                  <Text>
                    {navigation.getParam("language") === "en"
                      ? locale.en.addContacts
                      : locale.fr.addContacts}
                  </Text>
                </Button>
              )}
            </Item>
          </Right>
        </Header>

        <View style={{ flex: 1 }}>
          {this.state.isLoading ? (
            <View
              style={{
                ...StyleSheet.absoluteFill,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size="large" color="black" />
            </View>
          ) : null}
          <List>
            <FlatList
              data={this.state.contacts}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={() => (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 50,
                  }}
                >
                  <Text style={{ color: "black" }}>
                    {navigation.getParam("language") === "en"
                      ? locale.en.noContacts
                      : locale.fr.noContacts}
                  </Text>
                </View>
              )}
            />
          </List>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ContactList;
