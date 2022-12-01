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

// const db = openDatabase();

function openDatabase() {
  if (
    !FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite").exists
  ) {
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "SQLite");
  }

  console.log("before db creation");
  const db = SQLite.openDatabase("MainDB.db");
  console.log("after db creation");
  console.log(db);

  return db;
}

const getData = () => {
  try {
    db.transaction((tx) => {
      tx.executeSql("SELECT Name, Age FROM Users", [], (tx, results) => {
        var len = results.rows.length;
        if (len > 0) {
          var userName = results.rows.item(0).NAme;
          var userAge = results.rows.item(0).Age;
          console.log("From db Name: " + userName + " Age: " + userAge);
        }
      });
    }, console.log("after get data"));
  } catch (error) {
    console.log(error);
  }
};

const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists Users (id integer primary key autoincrement, NAme TEXT, Age INTEGER);"
    );
  });
};
