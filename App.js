import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import { firebase } from "./firebaseConfig";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import TranierSignUpScreen from "./screens/TranierSignUpScreen";
import MeasurementsScreen from "./screens/MeasurementsScreen";
import MyWorkoutsScreen from "./screens/MyWorkoutsScreen";
import SendFeedbackScreen from "./screens/SendFeedbackScreen";
import UserSignUpScreen from "./screens/UserSignUpScreen";
import AdminScreen from "./screens/AdminScreen";
import CreateWorkoutScreen from "./screens/CreateWorkoutScreen";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {}, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitle: "",
            headerTransparent: true,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="MyWorkouts" component={MyWorkoutsScreen} />
          <Stack.Screen name="TrainerSignUp" component={TranierSignUpScreen} />
          <Stack.Screen name="Measurements" component={MeasurementsScreen} />
          <Stack.Screen name="SendFeedback" component={SendFeedbackScreen} />
          <Stack.Screen name="UserSignUp" component={UserSignUpScreen} />
          <Stack.Screen name="Admin" component={AdminScreen} />
          <Stack.Screen name="CreateWorkout" component={CreateWorkoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
