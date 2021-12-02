import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer} from '@react-navigation/native'
import { createDrawerNavigator } from "@react-navigation/drawer";
import 'react-native-gesture-handler'

import Events from "./pages/events";
import Register from "./pages/Register";
import Login from "./pages/Login";
import JoinedEvents from "./pages/joinedEvents";
import CreateEvent from "./pages/createEvent";
import CreatedEvents from "./pages/createdEvents";
import Profile from "./pages/Profile";

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
        <Drawer.Screen name="Profile" component={Profile}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


