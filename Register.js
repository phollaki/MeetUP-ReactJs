import { Header, Button } from "react-native-elements"
import React, { useState } from "react"
import { Picker } from "@react-native-picker/picker"
import axios from 'axios'
import { StyleSheet, Text, TouchableOpacity, View, TextInput} from "react-native"
const Register = function () {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [city, setCity] = useState();
  const [eventType, setEventType] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  signUp = async () => {
    try {
      const {data} = await axios.post ('/api/registration', {email, password, city, eventType, phoneNumber}) 
      console.log(data)
      //console.log("user successfully signed up!: ", success);
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
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor="white"
        value={password}
        onChangeText={password => setPassword(password)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        autoCapitalize="none"
        placeholderTextColor="white"
        value={city}
        onChangeText={city => setCity(city)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        autoCapitalize="none"
        placeholderTextColor="white"
        value={phoneNumber}
        onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
      />
      <Picker
        selectedValue={eventType}
        style={styles.input}
        onValueChange={(itemValue) => setEventType(itemValue)}
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
