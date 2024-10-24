import {Stack} from "expo-router";
import Login from "@/app/login";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import Register from "@/app/register";
import Home from "@/app/home";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {MaterialIcons} from "@expo/vector-icons";

export default function RootLayout() {
    const Stack = createNativeStackNavigator()
    const Tab = createBottomTabNavigator();

    const HomeTabs = () => {
        return (
            <Tab.Navigator initialRouteName="Home">
                <Tab.Screen name="tasks" component={Home} options={{
                    tabBarIcon: () => {
                        return <MaterialIcons name="home" size={20} color="#000"/>
                    },
                    tabBarLabel: "My Tasks",
                    headerTitleAlign: "center",
                    headerTitle: "My Tasks"
                }}/>
                <Tab.Screen name="others" component={Home} options={{
                    tabBarIcon: () => {
                        return <MaterialIcons name="groups" size={20} color="#000"/>
                    },
                    tabBarLabel: "Others",
                    headerTitleAlign: "center",
                    headerTitle: "Other Tasks"
                }}/>
                <Tab.Screen name="archived" component={Home} options={{
                    tabBarIcon: () => {
                        return <MaterialIcons name="task-alt" size={20} color="#000"/>
                    },
                    tabBarLabel: "Archived",
                    headerTitleAlign: "center",
                    headerTitle: "Archived Tasks"
                }}/>
            </Tab.Navigator>
        )
    }


    return (
        <Stack.Navigator initialRouteName="login">
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
            <Stack.Screen name={"home"} component={HomeTabs} options={{
                headerShown: false
            }}>
            </Stack.Screen>
        </Stack.Navigator>
    );
}
