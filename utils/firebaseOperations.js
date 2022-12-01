import * as firebase from "firebase";

export const addToCollection = async (object, collectionName) => {
  return firebase.firestore().collection(collectionName).add(object);
};

export async function fetchFromCollection(collectionName) {
  var fetchedItemsList = [];

  await firebase
    .firestore()
    .collection(collectionName)
    .get()
    .then((x) => {
      x.docs.map((doc) => {
        // console.log(doc.data());
        fetchedItemsList.push(doc.data());
      });
    });
  return fetchedItemsList;
}
