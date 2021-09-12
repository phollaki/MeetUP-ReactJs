import { Header, Button } from "react-native-elements";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
const Register = function () {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [eventType, setEventType] = useState();

  const emailHandler = (e) => {
    setEmail(e);
  };
  const passwordHandler = (e) => {
    setPassword(e);
  };
  const addressHandler = (e) => {
    setAddress(e);
  };
  const eventTypeHandler = (e) => {
    setEventType(e);
  };
  signUp = async () => {
    try {
      // here place your signup logic
      console.log("user successfully signed up!: ", success);
    } catch (err) {
      console.log("error signing up: ", err);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={emailHandler}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={passwordHandler}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={addressHandler}
      />
      <Picker
        selectedValue={eventType}
        style={styles.input}
        onValueChange={eventTypeHandler}
      >
        <Picker.Item label="Football" value="football" />
        <Picker.Item label="Tennis" value="tennis" />
        <Picker.Item label="Table tennis" value="pingpong" />
        <Picker.Item label="Squash" value="squash" />
        <Picker.Item label="Swimming" value="swimming" />
        <Picker.Item label="Running" value="running" />
      </Picker>
      <TouchableOpacity onPress={signUp}>
        <Text style={styles.button}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: "green",
    margin: 10,
    padding: 8,
    color: "white",
    borderRadius: 14,
    fontSize: 18,
    fontWeight: "500",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 10,
    padding: 10,
  },
});
export default Register;
