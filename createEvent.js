import React, { useState } from "react";
import axios from 'axios'
import {StyleSheet, Text, TouchableOpacity, View, TextInput} from "react-native"
import { Picker } from "@react-native-picker/picker"

const createEvent = () =>{
    const [name, setName] = useState();
    const [city, setCity] = useState();
    const [description, setDescription] = useState();
    const [eventType, setEventType] = useState();
    //több nem jutott eszembe

    create = async () => {
        try {
          const {data} = await axios.post ('/api/create-event', {name, description, city, eventType}) 
          console.log(data)
          //console.log("user successfully signed up!: ", success);
        } catch (err) {
          console.log("error signing up: ", err);
        }
      };

    return(
        <View style={styles.container}>
            <TextInput
            style={styles.input}
            placeholder="Name"
            autoCapitalize="none"
            placeholderTextColor="white"
            value={name}
            onChangeText={name => setName(name)}
            />
            <TextInput
            style={styles.input}
            placeholder="City"
            autoCapitalize="none"
            placeholderTextColor="white"
            value={city}
            onChangeText={city => setCity(city)}
            />
            <TextInput
            style={styles.input}
            placeholder="Description"
            autoCapitalize="none"
            placeholderTextColor="white"
            value={description}
            onChangeText={description => setDescription(description)}
            />
            <Picker
                style={styles.input}
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
            <TouchableOpacity onPress={create}>
                <Text style={styles.button}>Create Event</Text>
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
export default createEvent;

