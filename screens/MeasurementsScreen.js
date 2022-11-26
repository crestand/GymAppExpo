import { StyleSheet, View, ScrollView } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import {
  TextInput,
  Button,
  Text,
  DataTable,
  List,
  Modal,
  Portal,
  Provider,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const optionsPerPage = [2, 3, 4];

const MeasurementsScreen = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const [mode, setMode] = useState("date");

  const showDatepicker = () => {
    showMode("date");
    setShow(true);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  ///// Data Table

  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  //// List
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  /// Modal

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 10,
    minHeight: "100%",
  };

  return (
    <ScrollView style={styles.container}>
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
            activeUnderlineColor="white"
            mode="flat"
          />
          <TextInput
            placeholder="Cm"
            style={styles.input}
            activeUnderlineColor="white"
            mode="flat"
          />
        </View>

        <View
          style={[
            styles.avatarContainer,
            { flex: 0.5, flexDirection: "row", marginTop: 15 },
          ]}
        >
          <Text style={styles.h1}>Weight</Text>
          <Text style={styles.h1}>Date</Text>
        </View>

        <View
          style={[styles.avatarContainer, { flex: 1, flexDirection: "row" }]}
        >
          <TextInput
            placeholder="kg"
            style={styles.input}
            activeUnderlineColor="white"
            mode="flat"
          />
          <Button
            onPress={showDatepicker}
            mode="contained"
            style={styles.button}
          >
            <Text style={styles.h2}>{date.toLocaleDateString()}</Text>
          </Button>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </View>
      </View>
      <View style={{ flex: 0.5, marginTop: 20 }}>
        <Button onPress={showDatepicker} mode="contained" style={styles.button}>
          <Text style={styles.h2}>SAVE</Text>
        </Button>
      </View>

      <View style={{ flex: 2, flexDirection: "row" }}>
        <View style={[{ flex: 1 }]}>
          <Provider>
            <Portal>
              <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={containerStyle}
              >
                <Text>Example Modal. Click outside this area to dismiss.</Text>
              </Modal>
            </Portal>
            <Button style={{ marginTop: 0 }} onPress={showModal}>
              Show
            </Button>
          </Provider>
        </View>
      </View>
      <View style={{ flex: 1 }}></View>
    </ScrollView>
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
    alignSelf: "flex-end",
    marginHorizontal: 35,
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
  dataTable: {
    maxHeight: "100%",
    width: "90%",
  },
});
