import React, { useState, useEffect, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native'
import { auth } from '../firebaseConfig'

import { Button, Chip, Provider, Portal, Dialog, Checkbox } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";


function openDatabase() {
    if (!(FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }

    console.log('before db creation')
    const db = SQLite.openDatabase('MainDB.db')
    console.log('after db creation')
    console.log(db)

    return db;
}

// const db = openDatabase();

const UserSignUpScreen = () => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    // const db = SQLite.openDatabase(
    //     {
    //         name: 'MainDB',
    //         location: 'default',
    //     },
    //     () => { },
    //     error => { console.log(error) }

    // );


    useEffect(() => {
        // createTable();
        // setData();
        // getData();
    }, []);

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "create table if not exists Users (id integer primary key autoincrement, NAme TEXT, Age INTEGER);"
            );
        });

    }

    const setData = async () => {
        try {
            await db.transaction(async (tx) => {
                await tx.executeSql(
                    "insert into Users (name,Age) VALUES (?,?);",
                    ['Eren', 15],
                    (tx, results) => {
                        console.log("after insert success")
                    }
                );
            },
                console.log("after insert")
            )
        } catch (error) {
            console.log(error)
        }
    }

    const getData = () => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT Name, Age FROM Users",
                    [],
                    (tx, results) => {
                        var len = results.rows.length;
                        if (len > 0) {
                            var userName = results.rows.item(0).NAme;
                            var userAge = results.rows.item(0).Age;
                            console.log("From db Name: " + userName + " Age: " + userAge)
                        }
                    }
                )
            },
                console.log("after get data")
            )
        } catch (error) {
            console.log(error)
        }
    }

    function validate_password(password) {
        let check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
        if (password.match(check)) {
            return true;
        } else {
            console.log("Meh, not so much.");
            return false;
        }
    }

    function validatePhoneNumber(phoneNumber) {
        //let check = /^05[0-9]{9}$)/;
        if (phoneNumber.match(check)) {
            return true;
        } else {
            console.log("Meh, not so much.");
            return false;
        }
    }

    



    const handleSignUp = () => {
        if (validate_password(password)) {
            auth
                .createUserWithEmailAndPassword(email, password)
                .then(userCredentials => {
                    const user = userCredentials.user;
                    console.log('Registered with:', user.email);
                })
                .catch(error => alert(error.message))
        }


    }

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            setShow(false);
            // for iOS, add a button that closes the picker
        }
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
        setShow(true)
    };


    return (
        <Provider>
            <KeyboardAvoidingView
                style={styles.container}
                behaviour="padding"
            >
                <View style={styles.inputContainer}>

                    <TextInput
                        placeholder="Name"
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="Last Name"
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                        keyboardType='email-address'
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />

                    <TextInput
                        placeholder="Gender"
                        style={styles.input}

                    />

                    <Button
                        placeholder="Birth Date"
                        value={date.toLocaleDateString()}
                        onPress={showDatepicker}
                        style={styles.input}
                    >
                        <Text> {date?.toLocaleDateString()} </Text>
                    </Button>

                    <TextInput
                        placeholder="Phone Number"
                        style={styles.input}
                        keyboardType='phone-pad'
                    />

                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )}

                    <TextInput
                        placeholder="Waist - cm"
                        style={styles.input}
                        keyboardType='decimal-pad'
                    />
                    <TextInput
                        placeholder="Shoulder - cm"
                        style={styles.input}
                        keyboardType='decimal-pad'
                    />

                    <TextInput
                        placeholder="Weight - kg"
                        style={styles.input}
                        keyboardType='decimal-pad'
                    />

                </View>


                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => { handleSignUp() }}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Text style={styles.buttonOutlineText}>Register</Text>

                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Provider>
    )
}

export default UserSignUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: "80%"
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: "blue",
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "blue",
        borderWidth: 2,
    },
    buttonOutlineText: {
        color: "blue",
        fontWeight: "700",
        fontSize: 16,
    },
    chip: {
        justifyContent: "center",
        width: '50%'
    }
})