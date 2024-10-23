import {Stack} from "expo-router";
import Login from "@/app/login";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import Register from "@/app/register";
import Home from "@/app/home";

export default function RootLayout() {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator initialRouteName="register">
            <Stack.Screen name={"login"} component={Login} options={{
                title: "Login",
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontWeight: "bold",
                }
            }}></Stack.Screen>
            <Stack.Screen name={"register"} component={Register} options={{
                title: "Create an account",
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontWeight: "bold",
                }
            }}></Stack.Screen>
            <Stack.Screen name={"home"} component={Home} options={{
                title: "Tasks List",
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontWeight: "bold",
                }
            }}></Stack.Screen>
        </Stack.Navigator>
    );
}
