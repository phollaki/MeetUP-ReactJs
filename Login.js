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
        <View> 
            <Text>Email:</Text>
            <TextInput value={email} onChangeText={email => setEmail(email)} />
            <Text>Password:</Text>
            <TextInput secureTextEntry={true} value={password} onChangeText={password => setPassword(password)} />
            <Button onPress={login} title="Login" />
        </View>
    );
};

export default Login;