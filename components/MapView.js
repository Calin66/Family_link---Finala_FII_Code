import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import MapView, { Callout, Circle, Heatmap, Marker } from "react-native-maps";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Mapview = ({ route }) => {
  const [location, setLocation] = useState();
  const { kid } = route.params;
  console.log(kid);
  points = [
    { latitude: 47.176891614209424, longitude: 27.522827423350382 },
    // { latitude: 47.183359077310016, longitude: 27.52505616045526 },
    { latitude: 47.171179991750556, longitude: 27.548721040608726 },
  ];

  useEffect(() => {
    if (kid) {
      // const getUserData = async () => {
      //   const infoRef = doc(db, "locations", kid);
      //   const docSnap = await getDoc(infoRef);
      //   if (docSnap.exists()) {
      //     setLocation(docSnap.data().loc);
      //   }
      // };
      // getUserData();
      const unsub = onSnapshot(doc(db, "locations", kid), (doc) => {
        setLocation(doc.data().loc);
      });
      return unsub;
    }
  }, [kid]);
  console.log(location);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0095,
            longitudeDelta: 0.0095,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            // pinColor="#3DFCFF"
          >
            <Callout>
              <Text>Kid here</Text>
            </Callout>
          </Marker>
          {points.map((point) => (
            <Circle
              center={{
                latitude: point.latitude,
                longitude: point.longitude,
              }}
              radius={150}
              fillColor={"rgba(200,0,30,0.5)"}
              strokeColor={"#D36300"}
              zIndex={101}
            />
          ))}
          <Circle
            center={{
              latitude: 47.183359077310016,
              longitude: 27.52505616045526,
            }}
            radius={250}
            fillColor={"rgba(61,255,108,0.5)"}
            strokeColor={"rgba(61,255,108,0.5)"}
            zIndex={100}
          />
          <Circle
            center={{
              latitude: 47.18526780378225,
              longitude: 27.566442240824284,
            }}
            radius={250}
            fillColor={"rgba(61,255,108,0.5)"}
            strokeColor={"rgba(61,255,108,0.5)"}
            zIndex={100}
          />
          {/* <Heatmap
            points={points}
            radius={50}
            opacity={0.4}
            gradient={{
              colors: ["black", "red", "yellow", "white"],
              startPoints: [0.01, 0.1, 0.45, 1],
              colorMapSize: 100,
            }}
          /> */}
        </MapView>
      )}
    </View>
  );
};

export default Mapview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
