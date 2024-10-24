import {Stack} from "expo-router";
import Login from "@/app/login";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Register from "@/app/register";
import Home from "@/app/home";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {MaterialIcons} from "@expo/vector-icons";
import Others from "@/app/others";
import Archived from "@/app/archived";
import {StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {color} from "ansi-fragments";
import {Asset} from "expo-asset";
import AddTask from "@/app/addTask";

export default function RootLayout() {
    const Stack = createNativeStackNavigator()
    const Tab = createBottomTabNavigator();

    const HomeTabs = () => {
        return (
            <Tab.Navigator initialRouteName="Home" screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName: string = "home"
                    let iconColor: string = focused ? "#03A9F4" : "#fff"

                    if (route.name === "others") {
                        iconName = "groups"
                    } else if (route.name === "archived") {
                        iconName = "task-alt"
                    }

                    return <Icon name={iconName} size={size} color={iconColor}/>;
                },
                tabBarActiveTintColor: '#03A9F4',
                tabBarStyle: {backgroundColor: "#212121"}
            })}>
                <Tab.Screen name="tasks" component={Home} options={{
                    tabBarLabel: "My Tasks",
                    tabBarLabelStyle: styles.tabBarLabel,
                    headerTitleAlign: "center",
                    headerTitle: "My Tasks"
                }}/>
                <Tab.Screen name="others" component={Others} options={{
                    tabBarLabel: "Others",
                    tabBarLabelStyle: styles.tabBarLabel,
                    headerTitleAlign: "center",
                    headerTitle: "Other Tasks",
                }}/>
                <Tab.Screen name="archived" component={Archived} options={{
                    tabBarLabel: "Archived",
                    tabBarLabelStyle: styles.tabBarLabel,
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
            <Stack.Screen name={"addTask"} component={AddTask} options={{
                headerTitleAlign: "center",
                headerTitle: "Add new task"
            }}>
            </Stack.Screen>
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBarLabel: {
        fontSize: 12,
        marginBottom: 5
    }
})
