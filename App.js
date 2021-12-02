import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Events from "./events";
import Register from "./Register";
import Login from "./Login";
import JoinedEvents from "./joinedEvents";
import CreateEvent from "./createEvent";
import 'react-native-gesture-handler'
import { NavigationContainer} from '@react-navigation/native'
import { createDrawerNavigator } from "@react-navigation/drawer";
import CreatedEvents from "./createdEvents";

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Events" component={Events}/>
        <Drawer.Screen name="Create Event" component={CreateEvent}/>
        <Drawer.Screen name="Joined Events" component={JoinedEvents}/>
        <Drawer.Screen name="Created Events" component={CreatedEvents}/>
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
