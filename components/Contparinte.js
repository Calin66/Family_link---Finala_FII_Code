import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import QrReader from "./qrReader/QrReader";

const Contparinte = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <QrReader />
    </SafeAreaView>
  );
};

export default Contparinte;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
