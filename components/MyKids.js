import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

import MapView from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

const MyKids = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [userCData, setUserCData] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      const getUserData = async () => {
        const infoRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(infoRef);
        if (docSnap.exists()) {
          setUserCData(docSnap.data());
        }
      };
      getUserData();
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyKids</Text>
      <View>
        {userCData &&
          userCData.savedkidsName.map((kid, index) => {
            const nameId = userCData.savedkidsName.indexOf(kid);
            const userId = userCData.savedkids[nameId];
            return (
              <Text
                key={index}
                style={styles.kid}
                onPress={() => {
                  navigation.navigate("Mapview", { kid: userId });
                }}
              >
                {kid}
              </Text>
            );
          })}
      </View>
    </View>
  );
};

export default MyKids;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  kid: {
    fontSize: 20,
  },
});
