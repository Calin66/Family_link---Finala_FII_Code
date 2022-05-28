import { useNavigation } from "@react-navigation/core";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import { AiOutlineClose } from "react-icons/ai";
import { db, login, signup, useAuth } from "../firebase";
import validateInfo from "./validate";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const [isSubmittingS, setIsSubmittingS] = useState(false);
  const [isSubmittingL, setIsSubmittingL] = useState(false);

  const [loginSuccess, setLoginSuccess] = useState(true);
  const [isEroare, setIsEroare] = useState(false);

  const navigation = useNavigation();

  const handleSubmit = async () => {
    console.log(email, password);
    setErrors(validateInfo(email, password));
    console.log(errors);
    setIsSubmittingS(true);
  };

  const handleSubmitL = async () => {
    setErrors(validateInfo(email, password));
    setIsSubmittingL(true);
  };
  const log = async () => {
    setIsSubmittingS(false);
    setIsSubmittingL(false);
    console.log("LOG");
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);
    if (user.uid) {
      const addInfo = async () => {
        const infoRef = doc(db, "users", user.uid);
        try {
          await setDoc(infoRef, {
            email: email,
            uid: user.uid,
            savedkids: [],
            savedkidsName: [],
          });
          // const displayName = values.username;
          // updateProfile(user, { displayName });
        } catch (error) {
          setIsEroare(true);
          alert(error);
        }
      };
      await addInfo();
      if (!isEroare) {
        navigation.navigate("Home");
        alert("Your account has been created");
      }
    }
  };
  const handleLogin = async () => {
    await login(email, password).catch(function (error) {
      let errorCode = error.code;
      if (errorCode) {
        setLoginSuccess(false);
        alert(errorCode);
      }
    });
    if (loginSuccess) {
      alert("Logare completa");
      navigation.navigate("Home");
    }
    setIsSubmittingS(false);
    setIsSubmittingL(false);
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmittingS) {
      console.log("am intrrat");
      setIsSubmittingS(false);
      setIsSubmittingL(false);
      const forsign = async () => {
        await signup(email, password).catch(function (error) {
          let errorCode = error.code;
          if (errorCode == "auth/email-already-in-use") {
            alert("Email in use");
            setIsEroare(true);
          }
        });
        //pt imagine
        if (isEroare) {
          alert("LOGIN?");
        } else {
          log();
        }
      };
      forsign();
    } else if (Object.keys(errors).length === 0 && isSubmittingL) {
      setIsSubmittingS(false);
      setIsSubmittingL(false);
      console.log("LOONGIN");
      handleLogin();
    } else if (isSubmittingS) {
      setIsSubmittingS(false);
    } else if (isSubmittingL) {
      setIsSubmittingL(false);
    }
  }, [isSubmittingS, isSubmittingL, errors]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.close} onPress={() => navigation.navigate("Home")}>
        {"<-"}
      </Text>
      {/* <AiOutlineClose /> */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        {errors.email && <Text style={styles.eroare}>{errors.email}</Text>}
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        {errors.password && (
          <Text style={styles.eroare}>{errors.password}</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSubmitL}
          style={styles.button}
          disabled={isSubmittingL || isSubmittingS}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.button, styles.buttonOutline]}
          disabled={isSubmittingL || isSubmittingS}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  eroare: {
    color: "red",
  },
  close: {
    color: "orange",
    zIndex: 1,
    fontSize: 35,
    position: "absolute",
    top: 45,
    left: "10%",
  },
  inputContainer: {
    width: "80%",
    position: "absolute",
    top: 200,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 350,
    display: "flex",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "orange",
    width: "45%",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
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
