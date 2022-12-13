import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { auth } from "../firebaseConfig";

import { Button, Provider, Portal, Dialog, Checkbox } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { validateTrainer } from "../utils/validation";
import * as firebase from "firebase";
import { uid } from "uid";

const TranierSignUpScreen = () => {
  useEffect(() => {}, []);

  const navigation = useNavigation();

  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    date: new Date(),
    phoneNumber: "",
    workdays: [],
    expertise: [],
  });

  const handleSignUp = () => {
    if (validateTrainer(user)) {
      console.log("Validated Trainer");
      //console.log(user);
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
            role: "trainer",
          };

          const trainerData = {
            id: uid(),
            user_id: userCredentials.user.uid,
            workdays: days,
            expertise: expertises,
          };
          firebase.firestore().collection("user").add(userData);
          firebase.firestore().collection("trainer_info").add(trainerData);
          // auth.updateCurrentUser(originalUser);
        })
        .catch((error) => alert(error.message));
    } else console.log("invalid trainer info");
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

  const [select, setSelect] = useState(false);
  const [checked, setChecked] = useState(false);

  const [expertiseVisible, setExpertiseVisible] = useState(false);
  const [daysVisible, setDaysVisible] = useState(false);

  const showDaysDialog = () => setDaysVisible(true);
  const hideDaysDialog = () => setDaysVisible(false);
  const showExpertiseDialog = () => setExpertiseVisible(true);
  const hideExpertiseDialog = () => setExpertiseVisible(false);

  const daysMock = [
    { id: 1, txt: "Monday" },
    { id: 2, txt: "Tuesday" },
    { id: 3, txt: "Wednesday" },
    { id: 4, txt: "Thursday" },
    { id: 5, txt: "Friday" },
  ];

  const expertiseMock = [
    { id: 1, txt: "Boxing" },
    { id: 2, txt: "Karate" },
    { id: 3, txt: "Yoga" },
    { id: 4, txt: "Fitness" },
    { id: 5, txt: "Cardio" },
  ];

  const [days, setDays] = useState([]);
  const [expertises, setExpertises] = useState([]);

  const handleChangeDays = (dayId) => {
    if (days.indexOf(dayId) === -1) {
      setDays((prev) => [...prev, dayId]);
    } else {
      setDays(days.filter((x) => x !== dayId));
    }
  };

  const handleChangeExpertise = (expertiseId) => {
    if (expertises.indexOf(expertiseId) === -1) {
      setExpertises((prev) => [...prev, expertiseId]);
    } else {
      setExpertises(expertises.filter((x) => x !== expertiseId));
    }
  };

  return (
    <Provider>
      <ScrollView>
        <View style={{ height: 100 }}></View>
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
              placeholder="0 5xx xxx xx"
              style={styles.input}
              onChangeText={(text) => {
                user.phoneNumber = text;
                setUser(user);
              }}
              keyboardType="phone-pad"
            />

            <View>
              <Button onPress={showDaysDialog}>Choose Available Days</Button>
              <Portal>
                <Dialog visible={daysVisible} onDismiss={hideDaysDialog}>
                  <Dialog.Title>Choose Available Days</Dialog.Title>
                  <Dialog.Content>
                    {daysMock.map((day) => {
                      const checked = days.indexOf(day.txt) !== -1;
                      return (
                        <View
                          key={day.txt}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                          onTouchEnd={() => {}}
                        >
                          <Checkbox
                            onPress={() => handleChangeDays(day.txt)}
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
                    <Button onPress={hideDaysDialog}>Done</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </View>

            <View>
              <Button onPress={showExpertiseDialog}>Choose Expertise</Button>
              <Portal>
                <Dialog
                  visible={expertiseVisible}
                  onDismiss={hideExpertiseDialog}
                >
                  <Dialog.Title>Choose Expertise</Dialog.Title>
                  <Dialog.Content>
                    {expertiseMock.map((expertise) => {
                      const checked = expertises.indexOf(expertise.txt) !== -1;
                      return (
                        <View
                          key={expertise.txt}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                          onTouchEnd={() => {}}
                        >
                          <Checkbox
                            onPress={() => {
                              handleChangeExpertise(expertise.txt);
                            }}
                            status={checked ? "checked" : "unchecked"}
                          />
                          <Text style={{ color: checked ? "blue" : "gray" }}>
                            {expertise.txt}
                          </Text>
                        </View>
                      );
                    })}
                  </Dialog.Content>

                  <Dialog.Actions>
                    <Button onPress={hideExpertiseDialog}>Done</Button>
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
                console.log(user);
                // console.log(days);

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
