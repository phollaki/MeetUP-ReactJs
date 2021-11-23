import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppHeader from "./AppHeader";
import { NativeRouter, Route, Link } from "react-router-native";
import Homepage from "./Homepage";
import Register from "./Register";
import Login from "./Login";
import CreateEvent from "./createEvent";
import 'react-native-gesture-handler'
import { NavigationContainer} from '@react-navigation/native'
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Homepage" component={Homepage}/>
        <Drawer.Screen name="Create Event" component={CreateEvent}/>
        <Drawer.Screen name="Register" component={Register}/>
        <Drawer.Screen name="Login" component={Login}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
