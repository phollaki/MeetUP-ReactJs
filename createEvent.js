import React, { useState} from "react"
import httpService from "./components/http-service.js"
import {StyleSheet, Text, TouchableOpacity, View, TextInput, Button, Platform} from "react-native"
import { Picker } from "@react-native-picker/picker"
import NumericInput from 'react-native-numeric-input'
import DateTimePicker from '@react-native-community/datetimepicker';


const createEvent = () =>{
    const [city, setCity] = useState();
    const [description, setDescription] = useState();
    const [typeOfEvent, setTypeOfEvent] = useState();
    const [numOfPeople, setNumOfPeople] = useState(null);

    const eventCreateHandler = async (e) => {
      e.preventDefault();
      const res = await httpService.createEvent(
        typeOfEvent,
        city,
        numOfPeople,
        description,
        date
      );
    };

    //datetime picker
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };

    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
    

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Number of people:</Text>
            <View margin={10}>
              <NumericInput onChange={value => setNumOfPeople(value)} minValue={1} rounded totalWidth={350} totalHeight={55}textColor={"green"} rightButtonBackgroundColor={"green"} leftButtonBackgroundColor={"green"}/>            
            </View>
            <View margin={10}>
            <Button onPress={showDatepicker} title="Set date" color="green" />
          </View>
          <View margin={10}>
            <Button onPress={showTimepicker} title="Set time!" color="green"/>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
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
            <View style={{borderRadius: 14, borderColor: '#bdc3c7', overflow: 'hidden', margin: 10}}>
            <Picker
                style={styles.picker}
                selectedValue={typeOfEvent}
                onValueChange={(itemValue) => setTypeOfEvent(itemValue)}
            >
                <Picker.Item label="Football" value="football" />
                <Picker.Item label="Tennis" value="tennis" />
                <Picker.Item label="Table tennis" value="pingpong" />
                <Picker.Item label="Squash" value="squash" />
                <Picker.Item label="Swimming" value="swimming" />
                <Picker.Item label="Running" value="running" />
            </Picker>
            </View>
            <TouchableOpacity onPress={eventCreateHandler}>
                <Text style={styles.button}>Create Event</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    text:{
      fontSize: 20,
    },
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
    picker: {
      width: 350,
      height: 55,
      backgroundColor: "green",
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

