import { StyleSheet, Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper';

import React from 'react'

const SendFeedbackScreen = () => {



    return (
        <View style={styles.container}>

            <Text style={styles.titleText}>Feedback</Text>

            <TextInput
                placeholder="Please enter your feedback"
                style={styles.input}
                multiline={() => { true }}
                mode='outlined'

            />

            <Button
                style={styles.button}
                mode="contained"
                onPress={() => {}}
                >
                <Text style={styles.buttonText}>Send</Text>
            </Button>
        </View>
    )


}

export default SendFeedbackScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',

    },

    input: {
        width: '90%',
        marginTop: 25,
        paddingVertical: 10,
        minHeight: '50%',
        maxHeight: '50%'
    },

    titleText: {
        marginTop: '25%',
        fontWeight: "500",
        fontSize: 32,
    },
    button: {
        width: '60%',
        padding: 5,
        borderRadius: 10,
        marginTop: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 20,
    },
})