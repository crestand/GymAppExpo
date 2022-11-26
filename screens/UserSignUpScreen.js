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
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { validateUser } from "../utils/validation";

function openDatabase() {
  if (
    !FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite").exists
  ) {
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "SQLite");
  }

  console.log("before db creation");
  const db = SQLite.openDatabase("MainDB.db");
  console.log("after db creation");
  console.log(db);

  return db;
}

// const db = openDatabase();

const UserSignUpScreen = () => {
  const navigation = useNavigation();

  // const db = SQLite.openDatabase(
  //     {
  //         name: 'MainDB',
  //         location: 'default',
  //     },
  //     () => { },
  //     error => { console.log(error) }

  // );

  useEffect(() => {
    // createTable();
    // setData();
    // getData();
  }, []);

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists Users (id integer primary key autoincrement, NAme TEXT, Age INTEGER);"
      );
    });
  };

  const setData = async () => {
    try {
      await db.transaction(async (tx) => {
        await tx.executeSql(
          "insert into Users (name,Age) VALUES (?,?);",
          ["Eren", 15],
          (tx, results) => {
            console.log("after insert success");
          }
        );
      }, console.log("after insert"));
    } catch (error) {
      console.log(error);
    }
  };

  const getData = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql("SELECT Name, Age FROM Users", [], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            var userName = results.rows.item(0).NAme;
            var userAge = results.rows.item(0).Age;
            console.log("From db Name: " + userName + " Age: " + userAge);
          }
        });
      }, console.log("after get data"));
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleSignUp = () => {
    if (validateUser(user)) {
      console.log("Validated");
    } else console.log("not valid");
    // if (validateUser(user)) {
    //   auth
    //     .createUserWithEmailAndPassword(user.email, user.password)
    //     .then((userCredentials) => {
    //       const user = userCredentials.user;
    //       console.log("Registered with:", user.email);
    //     })
    //     .catch((error) => alert(error.message));
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
                // console.log(user.name);
                // console.log(user.date);
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
