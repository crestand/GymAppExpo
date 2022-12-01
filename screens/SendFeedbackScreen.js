import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";

import React, { useState } from "react";
import { executeQuery } from "../utils/quaries";
import * as firebase from "firebase";
import { uid } from "uid";
import { validateFeedback } from "../utils/validation";
import { auth } from "../firebaseConfig";

const SendFeedbackScreen = () => {
  const [feedback, setFeedback] = useState({
    text: "",
  });

  const handleSendFeedback = () => {
    if (validateFeedback(feedback.text)) {
      console.log("Validated Feedback");
      // console.log(feedback);
      const feedbackData = {
        id: uid(),
        create_date: new Date(),
        sender_id: auth.currentUser.uid,
        workout_id: "get Workout Id",
        feedback: feedback.text,
      };
      // console.log(feedbackData);
      firebase.firestore().collection("feedback").add(feedbackData);
    } else console.log("Invalid Feedback");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Feedback</Text>

      <TextInput
        placeholder="Please enter your feedback"
        style={styles.input}
        multiline={() => {
          true;
        }}
        mode="outlined"
        onChangeText={(text) => {
          feedback.text = text;
          setFeedback(feedback);
        }}
      />

      <Button
        style={styles.button}
        mode="contained"
        onPress={() => {
          handleSendFeedback();
        }}
      >
        <Text style={styles.buttonText}>Send</Text>
      </Button>
    </View>
  );
};

export default SendFeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  input: {
    width: "90%",
    marginTop: 25,
    paddingVertical: 10,
    minHeight: "50%",
    maxHeight: "50%",
  },

  titleText: {
    marginTop: "25%",
    fontWeight: "500",
    fontSize: 32,
  },
  button: {
    width: "60%",
    padding: 5,
    borderRadius: 10,
    marginTop: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },
});
