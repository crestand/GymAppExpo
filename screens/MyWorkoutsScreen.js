import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput, Button, Text, Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebaseConfig";
import { fetchFromCollection } from "../utils/firebaseOperations";

const MyWorkoutsScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    getWorkouts();
  }, []);

  const [workouts, setWorkouts] = useState({
    id: "",
    student_id: "",
    trainer_id: "",
    workout_date: new Date(),
    expertise: [],
    trainerName: "",
    trainerLastName: "",
  });

  // const [user, setUser] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [isSendButtonEnable, setSendButtonEnable] = useState(true);
  // const [workout, setWorkout] = useState({
  //   trainer_id: "",
  //   studend_id: auth.currentUser.uid,
  //   workout_date: new Date(),
  //   expertise: [],
  //   id: uid(),
  // });

  const getWorkouts = async () => {
    setIsLoading(true);

    var fetchedItems = await (
      await fetchFromCollection("workouts")
    ).filter((x) => x.student_id == auth.currentUser.uid);
    // console.log(x.student_id);

    var user = await fetchFromCollection("user");

    fetchedItems.forEach((workout) => {
      user.forEach((info) => {
        if (workout.trainer_id == info.id) {
          workout.trainerName = info.name;
          workout.trainerLastName = info.lastName;
          // setWorkouts(workouts);
        }
      });
    });

    // console.log(fetchedItems);
    // console.log(workouts);
    // console.log(auth.currentUser.uid);

    // console.log("__________ T _ E _ S _ T _________:D");

    // var trainerInfos = await fetchFromCollection("trainer_info");

    // fetchedItems.forEach((trainer) => {
    //   trainerInfos.forEach((info) => {
    //     // console.log("trainer id " + trainer.id);
    //     // console.log("x id" + info.user_id);
    //     if (trainer.id == info.user_id) {
    //       // console.log(trainer.id);
    //       trainer.expertise = info.expertise;
    //     }
    //   });
    // then((x) => {
    //   console.log("trainer id " + trainer.id);
    //   console.log("x id" + x);

    //   if (x.id == trainer.id) {
    //     console.log(x.id);
    //   }
    // })
    // });
    console.log(fetchedItems);
    setWorkouts(fetchedItems);
    setIsLoading(false);
  };

  const renderList = (data) => {
    return (
      // <TouchableOpacity
      //   style={styles.button}
      //   onPress={() => {
      //     // showModal();
      //     // workout.trainer_id = data.id;
      //     // workout.workout_date = new Date();
      //     // workout.expertise = data.expertise;
      //     // workout.id = uid();
      //     // // console.log(data);
      //     // setWorkout(workout);
      //   }}
      // >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignContent: "center",
        }}
      >
        {/* <View style={[styles.avatarContainer, { flex: 4 }]}></View> */}

        <View style={[styles.avatarContainer, { flex: 5 }]}>
          <Text style={styles.avatarName}>
            Trainer: {data.trainerName} {data.trainerLastName}
          </Text>
          <Text style={styles.h1}> Date of Workout</Text>
          <Text style={styles.h2}>
            {new Date(data.workout_date?.seconds * 1000).toLocaleDateString()}
            {" - "}
            {new Date(data.workout_date?.seconds * 1000).toLocaleTimeString()}
          </Text>
          <Text style={styles.h1}> Branch </Text>
          <Text style={styles.h2}>{data.expertise}</Text>
        </View>
      </View>
      // </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignContent: "center",
        }}
      >
        <Button
          onPress={() => {
            navigation.push("CreateWorkout");
          }}
          mode="contained"
          style={styles.button}
        >
          <Text style={styles.h1}>+</Text>
        </Button>
      </View>

      {/* <View style={{ flex: 2, flexDirection: "row" }}>
        <View style={[styles.avatarContainer, { flex: 4 }]}>
          <Text style={styles.avatarName}>Trainer Name</Text>
          <Avatar.Image size={128} style={styles.avatar} />
        </View>

        <View style={[styles.avatarContainer, { flex: 5 }]}>
          <Text style={styles.h1}> Date of Workout</Text>
          <Text style={styles.h2}>DATE</Text>
          <Text style={styles.h1}> Branch of Sport</Text>
          <Text style={styles.h2}>BRANCH</Text>
        </View>
      </View>
      <View style={{ flex: 2, flexDirection: "row" }}>
        <View style={[styles.avatarContainer, { flex: 4 }]}>
          <Text style={styles.avatarName}>Trainer Name</Text>
          <Avatar.Image size={128} style={styles.avatar} />
        </View>

        <View style={[styles.avatarContainer, { flex: 5 }]}>
          <Text style={styles.h1}> Date of Workout</Text>
          <Text style={styles.h2}>DATE</Text>
          <Text style={styles.h1}> Branch of Sport</Text>
          <Text style={styles.h2}>BRANCH</Text>
        </View>
      </View> */}

      <View style={{ flex: 5 }}>
        <View style={styles.container}>
          <FlatList
            data={workouts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderList(item)}
          />
        </View>
      </View>

      <View style={{ flex: 1 }}></View>
    </View>
  );
};

export default MyWorkoutsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3E6D9C",
    alignSelf: "center",
    borderRadius: 20,
    width: "90%",
    margin: 10,
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
    margin: 5,
    marginTop: 10,
  },
  h2: {
    fontWeight: "550",
    fontSize: 20,
  },
  button: {
    width: "10%",
    // marginTop: 5,
    marginHorizontal: 10,
    alignSelf: "flex-end",
    borderRadius: 10,
    // paddingVertical: 15,
    // minHeight: '90%',
    // maxHeight: '100%',
  },
});
