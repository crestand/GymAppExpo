import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput, Button, Text, Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const MyWorkoutsScreen = () => {
  const navigation = useNavigation();

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
