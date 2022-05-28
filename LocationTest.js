import React, { useState, useEffect } from "react";
import { setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { v4 as uuidv4 } from "uuid";
import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";

import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import QrCode from "./components/qrReader/QrCode";

// const LOCATION_TASK_NAME = "LOCATION_TASK_NAME";
let foregroundSubscription = null;
// let IDUSER = false;

// // Define the background task for location tracking
// TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
//   console.log("Task start");
//   if (error) {
//     console.error(error);
//     return;
//   }
//   if (data) {
//     console.log(`data${data}`);
//     // Extract location coordinates from data
//     const { locations } = data;
//     const location = locations[0];
//     if (location) {
//       console.log("Location in background", location.coords);
//       const infoRef = doc(db, "locations", IDUSER);
//       const asf = async () => {
//         await setDoc(infoRef, {
//           loc: location.coords,
//         });
//       };
//       asf();
//     }
//   }
// });

export default function LocationTest() {
  const [position, setPosition] = useState(null);

  const [errorMsg, setErrorMsg] = useState(null);
  const [text, setText] = useState("Waiting..");
  const [uniqueId, setUniqueId] = useState(false);

  // Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
  const startForegroundUpdate = async () => {
    alert("Tracking");
    const { granted } = await Location.getForegroundPermissionsAsync();
    if (!granted) {
      console.log("location tracking denied");
      return;
    }
    console.log("ForeGroundPermissionsDone");

    foregroundSubscription = await Location.watchPositionAsync(
      {
        // For better logs, we set the accuracy to the most sensitive option
        accuracy: Location.Accuracy.BestForNavigation,
      },
      (location) => {
        const infoRef = doc(db, "locations", uniqueId);
        const asf = async () => {
          await setDoc(infoRef, {
            loc: location.coords,
          });
        };
        asf();
      }
    );

    // const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME);
    // if (!isTaskDefined) {
    //   console.log("Task is not defined");
    //   return;
    // }
    // console.log("Avem si task");

    // const hasStarted = await Location.hasStartedLocationUpdatesAsync(
    //   LOCATION_TASK_NAME
    // );
    // if (hasStarted) {
    //   console.log("Already started");
    //   await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    //   return;
    // }
    // console.log("Prima oara");

    // await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    //   accuracy: Location.Accuracy.BestForNavigation,
    //   showsBackgroundLocationIndicator: true,
    //   foregroundService: {
    //     notificationTitle: "Location",
    //     notificationBody: "Location tracking in background",
    //     notificationColor: "#fff",
    //   },
    // });
  };
  const stopForegroundUpdate = () => {
    foregroundSubscription?.remove();
  };
  useEffect(() => {
    // unsub();
    if (!uniqueId) {
      const funcBB = async () => {
        let fetchUUID = await SecureStore.getItemAsync("secure_deviceid");
        if (fetchUUID !== "false" && fetchUUID !== null) {
          console.log(`FETCHED ${JSON.parse(fetchUUID)}`);
          let uni = JSON.parse(fetchUUID);
          setUniqueId(uni);
        } else {
          let uni = uuidv4();
          setUniqueId(uni);
          await SecureStore.setItemAsync(
            "secure_deviceid",
            JSON.stringify(uni)
          );
        }
      };
      funcBB();
    }
    if (uniqueId) {
      const requestPermissions = async () => {
        const foreground = await Location.requestForegroundPermissionsAsync();
      };
      requestPermissions();
    }

    //   setInterval(async () => {
    //     const foregroundPermission =
    //       await Location.requestForegroundPermissionsAsync();
    //     if (!foregroundPermission.granted) return;

    //     const backgroundPermission =
    //       await Location.getBackgroundPermissionsAsync();

    //     if (backgroundPermission.status === "granted") {
    //       Location.startLocationUpdatesAsync(TASK_NAME, {
    //         // The following notification options will help keep tracking consistent
    //         showsBackgroundLocationIndicator: true,
    //         foregroundService: {
    //           notificationTitle: "Location",
    //           notificationBody: "Location tracking in background",
    //           notificationColor: "#fff",
    //         },
    //       });
    //     }

    //     if (foregroundPermission.granted) {
    //       foregroundSubscrition = Location.watchPositionAsync(
    //         {
    //           // Tracking options
    //           accuracy: Location.Accuracy.High,
    //           distanceInterval: 10,
    //         },
    //         (location) => {
    //           console.log(`uniqueId ${uniqueId}`);
    //           if (uniqueId) {
    //             const infoRef = doc(db, "locations", uniqueId);
    //             setText(JSON.stringify(location));
    //             const asf = async () => {
    //               await setDoc(infoRef, {
    //                 loc: location,
    //               });
    //               console.log(location);
    //             };
    //             asf();
    //           }
    //         }
    //       );
    //     }
    //   }, 25000);
    // }
  }, [uniqueId]);

  return (
    <View style={styles.container}>
      {uniqueId && <QrCode kid={uniqueId} />}
      <View style={styles.containerbuttoane}>
        <TouchableOpacity onPress={startForegroundUpdate} style={styles.button}>
          <Text style={styles.buttonText}>Start tracking</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={stopForegroundUpdate} style={styles.button}>
          <Text style={styles.buttonText}>Stop tracking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  containerbuttoane: {
    display: "flex",
    marginTop: 40,
  },
  button: {
    backgroundColor: "orange",
    width: "60%",
    height: 70,
    marginBottom: 20,
    height: 100,
    justifyContent: "center",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
