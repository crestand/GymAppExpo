import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput, Button, Text, Avatar } from "react-native-paper";
import * as firebase from "firebase";
import { uid } from "uid";
import { auth } from "../firebaseConfig";
import { fetchFromCollection } from "../utils/firebaseOperations";

const CreateWorkoutScreen = () => {
  const [trainers, setTrainers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);

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
    // console.log(new Date(data.birthdate?.nanoseconds || ""));
    return (
      <TouchableOpacity style={styles.button} onPress={() => console.log(data)}>
        <View style={{ flexDirection: "row", alignContent: "space-around" }}>
          <Text style={styles.h1}>{data.name}</Text>
          <Text style={styles.h1}>{data.lastName}</Text>
        </View>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Text style={styles.h2}>
            <Text style={{ fontWeight: "bold" }}>Gender: {data.gender}</Text>

            <Text style={{ fontWeight: "bold", marginLeft: "20" }}>
              -Expertise: {data.expertise}
            </Text>
          </Text>
        </View>
        {/* <View>
          <Text>{new Date(data.birthdate?.seconds || "").toString()}</Text>
        </View> */}
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getTrainers();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={trainers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderList(item)}
      />
    </View>
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
});
