import React, { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
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
import { validateTrainer } from "../utils/validation";

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

const TranierSignUpScreen = () => {
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    date: new Date(),
    phoneNumber: "",
  });

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

  const handleSignUp = () => {
    if (validateTrainer(user)) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("Registered with:", user.email);
        })
        .catch((error) => alert(error.message));
    }
  };

  function validatePhoneNumber(phoneNumber) {
    //let check = /^05[0-9]{9}$)/;
    if (phoneNumber.match(check)) {
      return true;
    } else {
      console.log("Meh, not so much.");
      return false;
    }
  }

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

  const [select, setSelect] = useState(false);

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [checked, setChecked] = useState(false);

  const daysMock = [
    { id: 1, txt: "Monday" },
    { id: 2, txt: "Tuesday" },
    { id: 3, txt: "Wednesday" },
    { id: 4, txt: "Thursday" },
    { id: 5, txt: "Friday" },
  ];

  const [days, setDays] = useState([]);

  // const handleChange = (id) => {

  //     let temp = products.map((product) => {
  //         if (id === product.id) {
  //             //console.log(product.isChecked)
  //             return { ...product, isChecked: !product.isChecked };

  //         }
  //         return product;
  //     });
  //     //console.log(temp)
  //     setProducts(temp);
  // };
  const handleChangeDays = (dayId) => {
    if (days.indexOf(dayId) === -1) {
      setDays((prev) => [...prev, dayId]);
    } else {
      setDays(days.filter((x) => x !== dayId));
    }
  };

  return (
    <Provider>
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

          <View
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text style={[styles.buttonOutlineText, { flex: 1.5 }]}>
              Birth Date
            </Text>

            <Button
              placeholder="Birth Date"
              value={user.date.toLocaleDateString()}
              onPress={showDatepicker}
              style={[styles.input, { flex: 2 }]}
            >
              <Text> {user.date.toLocaleDateString()} </Text>
            </Button>
          </View>

          <TextInput
            placeholder="Phone Number"
            style={styles.input}
            onChangeText={(text) => {
              user.phoneNumber = text;
              setUser(user);
            }}
            keyboardType="phone-pad"
          />

          <View>
            <Button onPress={showDialog}>Choose Available Days</Button>
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Choose Available Days</Dialog.Title>
                <Dialog.Content>
                  {daysMock.map((day) => {
                    const checked = days.indexOf(day.id) !== -1;
                    return (
                      <View
                        key={day.id}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                        onTouchEnd={() => {}}
                      >
                        <Checkbox
                          onPress={() => handleChangeDays(day.id)}
                          status={checked ? "checked" : "unchecked"}
                        />
                        <Text style={{ color: checked ? "blue" : "gray" }}>
                          {day.txt}
                        </Text>
                      </View>
                    );
                  })}
                </Dialog.Content>

                <Dialog.Actions>
                  <Button onPress={hideDialog}>Done</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={user.date}
              mode={mode}
              is24Hour={true}
              onChange={onChangeDate}
            />
          )}
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
    </Provider>
  );
};

export default TranierSignUpScreen;

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
