import * as firebase from "firebase";
import { userTemplateData } from "./utils/constructors";
import {
  addToCollection,
  FirebaseOperations,
} from "./utils/firebaseOperations";

const firebaseConfig = {
  apiKey: "AIzaSyDtAAbdLRXfXnC8ZzDWE3zMdp2hxLlPAEQ",
  authDomain: "gym-app-30e83.firebaseapp.com",
  projectId: "gym-app-30e83",
  storageBucket: "gym-app-30e83.appspot.com",
  messagingSenderId: "162730455673",
  appId: "1:162730455673:web:d5197b21ff3d3891ce1aa8",
};

// Initialize Firebase
let app;
if (firebase) {
  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app();
  }
  firebase
    .firestore()
    .collection("tablo")
    .get()
    .then((x) => x.docs.map((doc) => console.log(doc.data())));
}

const auth = firebase.auth();
export { auth };
// export default firebase
