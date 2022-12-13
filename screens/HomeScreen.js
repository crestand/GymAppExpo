import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { auth } from "../firebaseConfig";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email} </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.push("Measurements");
        }}
      >
        <Text style={styles.buttonText}>My Measurements</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.push("MyWorkouts");
        }}
      >
        <Text style={styles.buttonText}>Workouts</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.push("SendFeedback");
        }}
      >
        <Text style={styles.buttonText}>Send a Feedback</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await Sharing.shareAsync(
            FileSystem.documentDirectory + "SQLite/MainDB.db",
            { dialogTitle: "share or copy your DB via" }
          ).catch((error) => {
            console.log(error);
          });
        }}
      >
        <Text style={styles.buttonText}>Download DB</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          FileSystem.getContentUriAsync(
            FileSystem.documentDirectory + "SQLite/MainDB.db"
          ).then((cUri) => {
            console.log(cUri);
            IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
              data: cUri,
              flags: 1,
            });
          });
        }}
      >
        <Text style={styles.buttonText}>TEST</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
