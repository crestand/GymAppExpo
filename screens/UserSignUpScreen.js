import React, { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebaseConfig";

import {
  Button,
  Chip,
  Provider,
  Portal,
  Dialog,
  Checkbox,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { validateUser } from "../utils/validation";
import * as firebase from "firebase";
import { uid } from "uid";

const UserSignUpScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {}, []);

  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    date: new Date(),
    phoneNumber: "",
    waist: 0,
    shoulder: 0,
    weight: 0,
    height: 0,
  });

  const handleSignUp = async () => {
    if (validateUser(user)) {
      console.log("Validated User");
      // console.log(user);
      let originalUser = auth.currentUser;
      //console.log(originalUser);
      auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredentials) => {
          const userData = {
            id: userCredentials.user.uid,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            gender: user.gender,
            birthDate: user.date,
            phoneNumber: user.phoneNumber,
            role: "user",
          };
          const measurementData = {
            id: uid(),
            weight: user.weight,
            height: user.height,
            waist: user.waist,
            shoulder: user.shoulder,
            create_date: new Date(),
            user_id: userCredentials.user.uid,
          };
          // console.log(userData);
          // console.log(measurementData);
          firebase.firestore().collection("user").add(userData);
          firebase.firestore().collection("measurement").add(measurementData);
          // console.log(auth.currentUser);
          // console.log(auth.currentUser);
        })
        .catch((error) => alert(error.message));
      // console.log(auth.currentUser);
      // console.log(originalUser);
      // auth.updateCurrentUser(originalUser);
      // console.log(auth.currentUser);
    } else console.log("invalid user info");
    // if (validateUser(user)) {

    // }
  };

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    user.date = selectedDate;
    setUser(user);
    setShow(false);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
    setShow(true);
  };

  return (
    <Provider>
      <ScrollView style={{ display: "flex" }}>
        <View style={{ height: 80 }}></View>

        <KeyboardAvoidingView style={styles.container} behaviour="padding">
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Name"
              style={styles.input}
              onChangeText={(text) => {
                user.name = text;
                setUser(user);
              }}
            />

            <TextInput
              placeholder="Last Name"
              style={styles.input}
              onChangeText={(text) => {
                user.lastName = text;
                setUser(user);
              }}
            />

            <TextInput
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address"
              onChangeText={(text) => {
                user.email = text;
                setUser(user);
              }}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              onChangeText={(text) => {
                user.password = text;
                setUser(user);
              }}
              secureTextEntry
            />

            <TextInput
              placeholder="Gender"
              style={styles.input}
              onChangeText={(text) => {
                user.gender = text;
                setUser(user);
              }}
            />

            <Button
              placeholder="Birth Date"
              value={user.date.toLocaleDateString()}
              onPress={showDatepicker}
              style={styles.input}
            >
              <Text> {user.date?.toLocaleDateString()} </Text>
            </Button>

            <TextInput
              placeholder="0 5xx xxx xx"
              style={styles.input}
              onChangeText={(text) => {
                user.phoneNumber = text;
                setUser(user);
              }}
              keyboardType="phone-pad"
            />

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={user.date}
                mode={mode}
                is24Hour={true}
                onChange={onChangeDate}
              />
            )}

            <TextInput
              //value={user.waist}
              placeholder="Waist - cm"
              style={styles.input}
              keyboardType="decimal-pad"
              onChangeText={(text) => {
                user.waist = text;
                setUser(user);
              }}
            />
            <TextInput
              placeholder="Shoulder - cm"
              style={styles.input}
              keyboardType="decimal-pad"
              onChangeText={(text) => {
                user.shoulder = text;
                setUser(user);
              }}
            />

            <TextInput
              placeholder="Weight - kg"
              style={styles.input}
              keyboardType="decimal-pad"
              onChangeText={(text) => {
                user.weight = text;
                setUser(user);
              }}
            />

            <TextInput
              placeholder="Height - cm"
              style={styles.input}
              keyboardType="decimal-pad"
              onChangeText={(text) => {
                user.height = text;
                setUser(user);
              }}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                handleSignUp();
              }}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </Provider>
  );
};

export default UserSignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "blue",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "blue",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "blue",
    fontWeight: "700",
    fontSize: 16,
  },
  chip: {
    justifyContent: "center",
    width: "50%",
  },
});
