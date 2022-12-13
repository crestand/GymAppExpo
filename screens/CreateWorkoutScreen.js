import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  TextInput,
  Button,
  Text,
  Avatar,
  Modal,
  Provider,
  Portal,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as firebase from "firebase";
import { uid } from "uid";
import { auth } from "../firebaseConfig";
import { fetchFromCollection } from "../utils/firebaseOperations";
import { validateWorkout } from "../utils/validation";

const CreateWorkoutScreen = () => {
  const [trainers, setTrainers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [isSendButtonEnable, setSendButtonEnable] = useState(true);
  const [workout, setWorkout] = useState({
    trainer_id: "",
    student_id: auth.currentUser.uid,
    workout_date: new Date(),
    expertise: [],
    id: uid(),
  });

  const handleSendWorkout = () => {
    if (validateWorkout(workout)) {
      console.log("Validated Workout");
      setSendButtonEnable(false);
      console.log(workout);
      firebase.firestore().collection("workouts").add(workout);
    } else console.log("Invalid Feedback");
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const [show, setDateShow] = useState(false);
  const [mode, setDateMode] = useState("date");

  const onChangeDate = (event, selectedDate) => {
    workout.workout_date = selectedDate;
    setWorkout = workout;
    setDateShow(false);
  };

  const showDatepicker = () => {
    // console.log(measurement.date.toLocaleDateString());
    showMode("date");
    setDateShow(true);
  };

  const showMode = (currentMode) => {
    // if (Platform.OS === "android") {
    setDateShow(false);
    // }
    setDateMode(currentMode);
  };

  const getTrainers = async () => {
    setIsLoading(true);

    var fetchedItems = await (
      await fetchFromCollection("user")
    ).filter((x) => x.role == "trainer");
    // console.log("__________ T _ E _ S _ T _________:D");

    var trainerInfos = await fetchFromCollection("trainer_info");

    fetchedItems.forEach((trainer) => {
      trainerInfos.forEach((info) => {
        // console.log("trainer id " + trainer.id);
        // console.log("x id" + info.user_id);
        if (trainer.id == info.user_id) {
          // console.log(trainer.id);
          trainer.expertise = info.expertise;
        }
      });
      // then((x) => {
      //   console.log("trainer id " + trainer.id);
      //   console.log("x id" + x);

      //   if (x.id == trainer.id) {
      //     console.log(x.id);
      //   }
      // })
    });
    setTrainers(fetchedItems);
    setIsLoading(false);
  };

  const renderList = (data) => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          showModal();
          workout.trainer_id = data.id;
          workout.workout_date = new Date();
          workout.expertise = data.expertise;
          workout.id = uid();
          // console.log(data);
          setWorkout(workout);
        }}
      >
        <View style={{ flexDirection: "row", alignContent: "space-around" }}>
          <Text style={styles.h1}>{data.name}</Text>
          <Text style={styles.h1}>{data.lastName}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Gender: {data.gender}</Text>
          <Text style={{ fontWeight: "bold" }}>
            Expertise: {data.expertise}
          </Text>
          <Text style={{ fontWeight: "bold" }}>
            Age:
            {new Date().getFullYear() -
              new Date(data.birthDate?.seconds * 1000).getFullYear()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getTrainers();
  }, []);

  return (
    <Provider>
      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={hideModal}
          // contentContainerStyle={containerStyle}
          style={{ alignItems: "space-between" }}
        >
          <View style={{ flexDirection: "row" }}>
            <Button
              style={styles.hourSelectButton}
              onPress={() => {
                let hour = workout.workout_date;
                hour.setHours(9, 0, 0, 0); //Handled time zones
                // hour.setUTCHours(10, 0, 0, 0);
                // console.log(hour.toLocaleTimeString());
                workout.workout_date = hour;
                setWorkout(workout);
                hideModal();
                // console.log(workout);
              }}
            >
              <Text>9:00</Text>
            </Button>
            <Button
              style={styles.hourSelectButton}
              onPress={() => {
                let hour = workout.workout_date;
                hour.setHours(10, 0, 0, 0); //Handled time zones
                // hour.setUTCHours(10, 0, 0, 0);
                // console.log(hour.toLocaleTimeString());
                workout.workout_date = hour;
                setWorkout(workout);
                hideModal();
                // console.log(workout);
              }}
            >
              <Text>10:00</Text>
            </Button>

            <Button
              style={styles.hourSelectButton}
              onPress={() => {
                let hour = workout.workout_date;
                hour.setHours(11, 0, 0, 0); //Handled time zones
                // hour.setUTCHours(10, 0, 0, 0);
                // console.log(hour.toLocaleTimeString());
                workout.workout_date = hour;
                setWorkout(workout);
                hideModal();

                // console.log(workout);
              }}
            >
              <Text>11:00</Text>
            </Button>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Button
              style={styles.hourSelectButton}
              onPress={() => {
                let hour = workout.workout_date;
                hour.setHours(13, 0, 0, 0); //Handled time zones
                // hour.setUTCHours(10, 0, 0, 0);
                // console.log(hour.toLocaleTimeString());
                workout.workout_date = hour;
                setWorkout(workout);
                hideModal();

                // console.log(workout);
              }}
            >
              <Text>13:00</Text>
            </Button>

            <Button
              style={styles.hourSelectButton}
              onPress={() => {
                let hour = workout.workout_date;
                hour.setHours(14, 0, 0, 0); //Handled time zones
                // hour.setUTCHours(10, 0, 0, 0);
                // console.log(hour.toLocaleTimeString());
                workout.workout_date = hour;
                setWorkout(workout);
                hideModal();

                // console.log(workout);
              }}
            >
              <Text>14:00</Text>
            </Button>
            <Button
              style={styles.hourSelectButton}
              onPress={() => {
                let hour = workout.workout_date;
                hour.setHours(15, 0, 0, 0); //Handled time zones
                // hour.setUTCHours(10, 0, 0, 0);
                // console.log(hour.toLocaleTimeString());
                workout.workout_date = hour;
                setWorkout(workout);
                hideModal();

                // console.log(workout);
              }}
            >
              <Text>15:00</Text>
            </Button>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Button
              style={styles.hourSelectButton}
              onPress={() => {
                let hour = workout.workout_date;
                hour.setHours(16, 0, 0, 0); //Handled time zones
                // hour.setUTCHours(10, 0, 0, 0);
                // console.log(hour.toLocaleTimeString());
                workout.workout_date = hour;
                setWorkout(workout);
                hideModal();
                // console.log(workout);
              }}
            >
              <Text>16:00</Text>
            </Button>

            <Button
              style={styles.hourSelectButton}
              onPress={() => {
                let hour = workout.workout_date;
                hour.setHours(17, 0, 0, 0); //Handled time zones
                // hour.setUTCHours(10, 0, 0, 0);
                // console.log(hour.toLocaleTimeString());
                workout.workout_date = hour;
                setWorkout(workout);
                hideModal();
                // console.log(workout);
              }}
            >
              <Text>17:00</Text>
            </Button>
            <Button
              style={styles.hourSelectButton}
              onPress={() => {
                let hour = workout.workout_date;
                hour.setHours(18, 0, 0, 0); //Handled time zones
                // hour.setUTCHours(10, 0, 0, 0);
                // console.log(hour.toLocaleTimeString());
                workout.workout_date = hour;
                setWorkout(workout);
                hideModal();
                // console.log(workout);
              }}
            >
              <Text>18:00</Text>
            </Button>
          </View>

          <Button
            onPress={showDatepicker}
            mode="contained"
            style={styles.button}
          >
            <Text
              style={styles.h2}
              value={workout.workout_date.toLocaleDateString()}
            >
              {workout.workout_date.toLocaleDateString()}
            </Text>
          </Button>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={workout.workout_date}
              mode={mode}
              // is24Hour={true}
              onChange={onChangeDate}
            />
          )}
        </Modal>
      </Portal>

      <View style={styles.container}>
        <FlatList
          data={trainers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => renderList(item)}
        />

        <Button
          style={styles.button}
          disabled={!isSendButtonEnable}
          onPress={() => {
            handleSendWorkout();
          }}
        >
          <Text>Create Workout</Text>
        </Button>
      </View>
    </Provider>
  );
};

export default CreateWorkoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatarName: {
    fontWeight: "600",
    fontSize: 20,
  },
  h1: {
    fontWeight: "800",
    fontSize: 26,
    // margin: 5,
    // marginTop: 10,
    // alignSelf: "center",
    marginHorizontal: 5,
  },
  h2: {
    fontWeight: "600",
    fontSize: 15,
    color: "white",
    marginHorizontal: 5,
  },
  input: {
    width: "40%",
    marginTop: 5,
    marginHorizontal: 10,
    alignSelf: "center",
    borderRadius: 10,
    // paddingVertical: 10,
    // minHeight: '10%',
    // maxHeight: '100%',
  },
  button: {
    width: "90%",
    // marginTop: 5,
    marginHorizontal: 10,
    alignSelf: "center",
    borderRadius: 10,
    // paddingVertical: 15,
    // minHeight: '90%',
    // maxHeight: '100%',
    backgroundColor: "blue",
    overflow: "hidden",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  hourSelectButton: {
    width: "30%",
    // marginTop: 5,
    marginHorizontal: 10,
    // alignSelf: "center",
    borderRadius: 10,
    // paddingVertical: 15,
    // minHeight: '90%',
    // maxHeight: '100%',
    backgroundColor: "blue",
    overflow: "hidden",
    // padding: 20,
    // paddingHorizontal: 5,
    marginVertical: 8,
    marginHorizontal: 5,
  },
  dataTable: {
    maxHeight: "100%",
    width: "90%",
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: "90%",
    overflow: "hidden",
  },
  title: {
    fontSize: 32,
  },
  list: {
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
  },
  trainerInfoText: {
    fontWeight: "600",
    fontSize: 15,
    color: "white",
    marginHorizontal: 5,
  },
});
