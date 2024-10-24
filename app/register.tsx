import {Text, View, StyleSheet, Alert, TextInput, Button} from "react-native";
import {useEffect, useState} from "react";
import {Link, router} from "expo-router";
import {signupAction} from "@/services/api";
import PasswordInput from "@/components/PasswordInput";
import {userConnected} from "@/services/utils";

export default function Register() {

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        //Redirect user to home page if already connected
        userConnected()
    }, []);

    const handleRegister = async () => {
        if (!firstName || !lastName || !email || !password) {
            Alert.alert('Error', 'Please fill out all fields');
            return;
        }

        // Email format validation
        const emailPattern = /\S+@\S+\.\S+/;
        if (!emailPattern.test(email)) {
            Alert.alert('Error', 'Please enter a valid email');
            return;
        }

        signupAction({firstName, lastName, email, password}).then(data => {
            Alert.alert('Success', `You've been succesfully registered`);
            router.replace('/login')
        }).catch(error => {
            Alert.alert('Something went wrong', `${error}!`);
        })

    };

    return (
        <View style={styles.container}>

            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />

            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <PasswordInput value={password} onChangeText={setPassword} containerStyle={styles.input}/>

            <Button title="Register" onPress={handleRegister}/>

            <Text style={styles.loginText}>Already have an account? Please login <Link style={styles.loginLink}
                                                                                       replace={true}
                                                                                       href={"/login"}>here</Link></Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    loginLink: {
        color: "blue",
        fontWeight: "bold",
        textDecorationLine: "underline"
    },
    loginText: {
        fontSize: 12,
        marginVertical: 10,
        textAlign: 'center',
    },

})