import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";

export default function QrReader() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [kidName, setKidName] = useState("");

  const [userCData, setUserCData] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      //   console.log(status);
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    const auth = getAuth();
    const user = auth.currentUser;
    const infoRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(infoRef);

    if (docSnap.exists()) {
      if (kidName) {
        let thesseData = docSnap.data();
        setUserCData(thesseData);

        let savedKidsI = thesseData.savedkids;
        let savedKidsNames = thesseData.savedkidsName;

        savedKidsI.push(data);
        savedKidsNames.push(kidName);

        await updateDoc(infoRef, {
          savedkids: savedKidsI,
          savedkidsName: savedKidsNames,
        });
        navigation.navigate("Home");
      } else {
        console.log("Error docSnap");
      }
    } else {
      alert("Enter your kid's name");
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.itext}>Track your kid by scanning his qr code</Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button
          color="orange"
          title={"Tap to Scan Again"}
          onPress={() => setScanned(false)}
        />
      )}
      <TextInput
        style={styles.kidsname}
        placeholder="Enter your kid's name"
        value={kidName}
        onChangeText={(text) => setKidName(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  kidsname: {
    position: "absolute",
    bottom: 40,
    backgroundColor: "orange",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  itext: {
    zIndex: 2,
    color: "orange",
    position: "absolute",
    top: 60,
    fontSize: 20,
  },
});
