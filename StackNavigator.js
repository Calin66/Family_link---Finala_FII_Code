import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";

import LocationTest from "./LocationTest";
import Contparinte from "./components/Contparinte";
import Home from "./components/Home";
import QrCode from "./components/qrReader/QrCode";
import LoginScreen from "./screens/LoginScreen";
import MyKids from "./components/MyKids";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Contparinte" component={Contparinte} />
        <Stack.Screen name="Copil" component={LocationTest} />
        <Stack.Screen name="MyKids" component={MyKids} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
