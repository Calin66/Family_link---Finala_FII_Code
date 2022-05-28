import { async } from "@firebase/util";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import { logout, useAuth } from "../firebase";

const Home = () => {
  const navigation = useNavigation();
  const currentUser = useAuth();
  const handleLogout = async () => {
    logout(currentUser);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 25, marginBottom: 0, fontWeight: "500" }}>
        Wellcome to StayTogether
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 40 }}>
        Your children safety first
      </Text>
      {currentUser && (
        <Text style={{ fontSize: 18, fontWeight: "300", marginBottom: 20 }}>
          {currentUser.email}
        </Text>
      )}
      {!currentUser ? (
        <View style={styles.cbutoane}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Parent Device </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Copil")}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Kid Device</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={styles.cbutoane}>
            <TouchableOpacity
              style={[styles.button, styles.buttonLogout]}
              onPress={handleLogout}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Contparinte")}
            >
              <Text style={styles.buttonText}>Add kid</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cbutoane}>
            <TouchableOpacity
              style={styles.button}
              onPress={()=>navigation.navigate("MyKids")}
            >
              <Text style={styles.buttonText}>See your kids</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    padding: 20,
    marginTop: 100,
  },
  cbutoane: {
    display: "flex",
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    display: "flex",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "orange",
    width: "45%",
    height: 100,
    justifyContent: "center",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonLogout: {
    backgroundColor: "red",
  },
  buttonOutline: {
    backgroundColor: "white",
    borderColor: "orange",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "orange",
    fontWeight: "700",
    fontSize: 16,
  },
});
