import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppHeader from "./AppHeader";
import { NativeRouter, Route, Link } from "react-router-native";
import Homepage from "./Homepage";
import Register from "./Register";
import Login from "./Login";

export default function App() {
  return (
    <NativeRouter>
      <View>
        <AppHeader />
      </View>
      <Route exact path="/" component={Homepage} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
    </NativeRouter>
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
