export const setData = async () => {
  try {
    await db.transaction(async (tx) => {
      await tx.executeSql(
        "insert into Users (name,Age) VALUES (?,?);",
        ["Eren", 15],
        (tx, results) => {
          console.log("after insert success");
        }
      );
    }, console.log("after insert"));
  } catch (error) {
    console.log(error);
  }
};

export const executeQuery = (query) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(query, [], (tx, results) => {
        return results;
      });
    });
  } catch (error) {
    console.log(error);
  }
};
