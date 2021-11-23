import {  StyleSheet,  Text,  Button,  TouchableOpacity,  View,  TextInput,} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import axios from 'axios';

const Login = () =>{

    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const login = async () => {
        const { data } = await axios.post('http://192.168.0.104:3001/api/login', {
          email,
          password,
        })

        if(data!="Wrong email" && data!="Wrong password" ){
            axios.defaults.headers.authorization = `Bearer ${data.token}`
            await AsyncStorage.setItem('token',data.token);
            console.log(data.token)
          } else {
            console.log("Nem sikerült bejelentkezni")
          }
        };

    return (
        <View style={styles.container}> 
            <Text>Email:</Text>
            <TextInput value={email} onChangeText={email => setEmail(email)} style={styles.input} />
            <Text>Password:</Text>
            <TextInput secureTextEntry={true} value={password} onChangeText={password => setPassword(password)} style={styles.input} />
            <TouchableOpacity onPress={Login}>
                <Text style={styles.button}>Login</Text>
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

export default Login;