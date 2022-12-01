import { StyleSheet, View, ScrollView, FlatList } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { TextInput, Button, Text } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { validateMeasurements } from "../utils/validation";
import * as firebase from "firebase";
import { uid } from "uid";
import { auth } from "../firebaseConfig";
import { fetchFromCollection } from "../utils/firebaseOperations";

const MeasurementsScreen = () => {
  const [measurementList, setMeasurementList] = useState([]);

  useEffect(() => {
    getMeasurements();
  }, []);

  const getMeasurements = async () => {
    var fetchedItems = await (
      await fetchFromCollection("measurement")
    ).filter((x) => x.user_id == auth.currentUser.uid);
    setMeasurementList(fetchedItems);
  };

  const [measurement, setMeasurement] = useState({
    date: new Date(),
    waist: 0,
    shoulder: 0,
    weight: 0,
    height: 0,
  });

  const handleSendMeasurement = () => {
    if (validateMeasurements(measurement)) {
      console.log("Validated Feedback");
      const measurementData = {
        id: uid(),
        create_date: measurement.date,
        user_id: auth.currentUser.uid,
        weight: measurement.weight,
        height: measurement.height,
        waist: measurement.waist,
        shoulder: measurement.shoulder,
      };
      // firebase.firestore().collection("measurement").add(measurementData);
    } else console.log("Invalid Feedback");
  };

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const onChangeDate = (event, selectedDate) => {
    measurement.date = selectedDate;
    setMeasurement = measurement;
    setShow(false);
  };

  const showDatepicker = () => {
    console.log(measurement.date.toLocaleDateString());
    showMode("date");
    setShow(true);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
    }
    setMode(currentMode);
  };

  const renderList = (data) => {
    return (
      <View style={styles.measurementContainer}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.h2}>
            Date :
            {new Date(data.create_date?.seconds * 1000).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.measurementContainerText}>
          <Text style={styles.h1}>Height: {data.height}</Text>
          <Text style={styles.h1}>Shoulder: {data.shoulder}</Text>
        </View>
        <View style={styles.measurementContainerText}>
          <Text style={styles.h1}>Waist: {data.waist}</Text>
          <Text style={styles.h1}>Height: {data.height}</Text>
        </View>
      </View>
    );
  };

  return (
    // <ScrollView style={styles.container}>
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}></View>

      <View style={{ flex: 2 }}>
        <View
          style={[styles.avatarContainer, { flex: 0.5, flexDirection: "row" }]}
        >
          <Text style={styles.h1}>Waist</Text>
          <Text style={styles.h1}>Shoulder</Text>
        </View>

        <View
          style={[styles.avatarContainer, { flex: 1, flexDirection: "row" }]}
        >
          <TextInput
            placeholder="Cm"
            style={styles.input}
            keyboardType="decimal-pad"
            activeUnderlineColor="white"
            mode="flat"
            onChangeText={(text) => {
              measurement.waist = text;
              setMeasurement(measurement);
            }}
          />
          <TextInput
            placeholder="Cm"
            style={styles.input}
            keyboardType="decimal-pad"
            activeUnderlineColor="white"
            mode="flat"
            onChangeText={(text) => {
              measurement.shoulder = text;
              setMeasurement(measurement);
            }}
          />
        </View>

        <View
          style={[
            styles.avatarContainer,
            { flex: 0.5, flexDirection: "row", marginTop: 15 },
          ]}
        >
          <Text style={styles.h1}>Weight</Text>
          <Text style={styles.h1}>Height</Text>
        </View>

        <View
          style={[styles.avatarContainer, { flex: 1, flexDirection: "row" }]}
        >
          <TextInput
            placeholder="kg"
            style={styles.input}
            keyboardType="decimal-pad"
            activeUnderlineColor="white"
            mode="flat"
            onChangeText={(text) => {
              measurement.weight = text;
              setMeasurement(measurement);
            }}
          />

          <TextInput
            placeholder="cm"
            style={styles.input}
            keyboardType="decimal-pad"
            activeUnderlineColor="white"
            mode="flat"
            onChangeText={(text) => {
              measurement.height = text;
              setMeasurement(measurement);
            }}
          />
        </View>
      </View>
      <View
        style={{
          flex: 0.5,
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button onPress={showDatepicker} mode="contained" style={styles.button}>
          <Text style={styles.h2}>{measurement.date.toLocaleDateString()}</Text>
        </Button>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={measurement.date}
            mode={mode}
            is24Hour={true}
            onChange={onChangeDate}
          />
        )}

        <Button
          onPress={handleSendMeasurement}
          mode="contained"
          style={styles.button}
        >
          <Text style={styles.h2}>SAVE</Text>
        </Button>
      </View>

      <View style={{ flex: 4 }}>
        <FlatList
          data={measurementList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => renderList(item)}
        ></FlatList>
      </View>
      <View style={{ flex: 0.5 }}></View>
    </View>
  );
};

export default MeasurementsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  avatar: {
    marginTop: 50,
  },
  avatarName: {
    fontWeight: "600",
    fontSize: 20,
  },
  h1: {
    fontWeight: "800",
    fontSize: 20,
    // margin: 5,
    // marginTop: 10,
    alignSelf: "auto",
    // marginHorizontal: 35,
  },
  h2: {
    fontWeight: "600",
    fontSize: 25,
    color: "white",
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
    width: "40%",
    // marginTop: 5,
    marginHorizontal: 10,
    alignSelf: "center",
    borderRadius: 10,
    // paddingVertical: 15,
    // minHeight: '90%',
    // maxHeight: '100%',
  },
  measurementContainer: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#150050",
    overflow: "hidden",
    padding: 10,
    marginVertical: 10,
  },
  measurementContainerText: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
