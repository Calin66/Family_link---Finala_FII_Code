import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View, Button } from "react-native";

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text>Wellcome to StayTogether</Text>
      <Button
        color="#393E46"
        onPress={() => navigation.navigate("contparinte")}
        title="Sunt parinte"
      />
      <Button
        color="#393E46"
        onPress={() => navigation.navigate("copil")}
        title="Sunt copil"
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
