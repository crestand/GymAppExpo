import { executeQuery } from "./quaries";

const createUserTableQuery = `
    CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    gender INTEGER,
    phone_number TEXT NOT NULL,
    email TEXT NOT NULL,
    role INTEGER NOT NULL,
    birth_date TEXT
  )`;

const createMeasurementTableQuery = `  CREATE TABLE measurement (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    weight INTEGER NOT NULL,
    height INTEGER NOT NULL,
    waist INTEGER NOT NULL,
    create_date TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) 
            REFERENCES user (id)
  )`;

const createWorkoutsTableQuery = ` CREATE TABLE workouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workout_date TEXT NOT NULL,
    trainer_id INTEGER NOT NULL,
    student_id INTEGER NOT NULL,
    expertise INTEGER NOT NULL,
    FOREIGN KEY (workout_date) 
            REFERENCES user (id),
    FOREIGN KEY (trainer_id) 
            REFERENCES user (id)
  )`;

const createFeedbackTableQuery = ` CREATE TABLE feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    feedback TEXT NOT NULL,
    create_date TEXT NOT NULL,
    workout_id INTEGER NOT NULL,
    FOREIGN KEY (workout_id) 
            REFERENCES workout (id)
  )`;

const createTrainerTableQuery = `CREATE TABLE trainer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    work_day TEXT NOT NULL,
    expertise INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) 
            REFERENCES user (id)
  )`;

const getAllTableQuery = "SELECT name FROM sqlite_schema";

export function connectToDatabase() {
  if (
    !FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite").exists
  ) {
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "SQLite");
  }

  const db = SQLite.openDatabase("MainDB.db");
  return db;
}

async function seedDatabase() {
  const schemaTables = await executeQuery(getAllTableQuery);

  if (schemaTables["user"]) {
    await executeQuery(createUserTableQuery);
  }
}
