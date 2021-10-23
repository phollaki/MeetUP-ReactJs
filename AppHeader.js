import { Header, Button } from "react-native-elements";
import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";

const AppHeader = () => {
  return (
    <View>
      <Header
        backgroundColor="green"
        leftComponent={
          <View style={styles.button}>
            <Text style={styles.buttonText}>MeetUP</Text>
          </View>
        }
        centerComponent={
          <TouchableOpacity style={styles.button} onPress={this.onPress}>
            <Link to="/">
              <Text style={styles.buttonText}>Recommend</Text>
            </Link>
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity style={styles.button} onPress={this.onPress}>
            <Link to="/create_event">
              <Text style={styles.buttonText}>Create Event</Text>
            </Link>
          </TouchableOpacity>
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 10,
  },
  buttonText: {
    color: "#fff",
  },
});
export default AppHeader;
