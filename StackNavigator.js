import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";

import LocationTest from "./LocationTest";
import Contparinte from "./components/Contparinte";
import Home from "./components/Home";
import QrCode from "./components/qrReader/QrCode";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Group>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="contparinte" component={Contparinte} />
        <Stack.Screen name="copil" component={LocationTest} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
