import {Text, View, StyleSheet, Alert, TextInput, Button} from "react-native";
import {useState} from "react";
import {Link, router} from "expo-router";
import {loginAction} from "@/services/api";
import {setCurrentUser} from "@/services/user";

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // Function to handle login
    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill out all fields');
            return;
        }

        loginAction({email, password}).then(async data => {
            Alert.alert('Success', `Logged in with email: ${email}`);
            await setCurrentUser(JSON.stringify(data))
            router.replace('/home')
        }).catch(error => {
            Alert.alert('Something went wrong', `${error}!`);
        })

    };

    return (
        <View style={styles.container}>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title="Login" onPress={handleLogin}/>

            <Text style={styles.registerText}>Don't have an account? Please register <Link style={styles.registerLink}
                                                                                           replace={true}
                                                                                           href={"/register"}>here</Link></Text>
        </View>
    );
};

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
    registerLink: {
        color: "blue",
        fontWeight: "bold",
        textDecorationLine: "underline"
    },
    registerText: {
        fontSize: 12,
        marginVertical: 10,
        textAlign: 'center',
    }
});