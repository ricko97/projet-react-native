import {Alert, FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {getCurrentUser, logoutUser} from "@/services/user";
import React, {Component} from "react";
import {TaskUser, User} from "@/services/models";
import {getTasks, updateTask} from "@/services/api";
import Task from "@/components/Task";
import {SafeAreaProvider} from "react-native-safe-area-context";
import IconButton from "@/components/IconButton";
import {router} from "expo-router";


interface State {
    currentUser: User | null;
    tasks: TaskUser[]
}

export default class Home extends Component<{}, State> {

    constructor(props: {}) {
        super(props);
        this.state = {
            currentUser: null,
            tasks: []
        }
    }


    async componentDidMount() {
        const data = await getCurrentUser();
        const user = JSON.parse(data!) as User
        this.setState({currentUser: user})

        await this.loadTasks(user.userId)

    }


    async loadTasks(userId: string) {
        const res = await getTasks(userId);
        this.setState({tasks: res.tasks});
    }

    async toggleTaskDone(taskId: string, isDone: boolean) {
        const userId = this.state.currentUser!.userId
        updateTask({userId, taskId, isDone}).then(_ => {
            this.loadTasks(userId)
        })
    }


    async logout() {
        await logoutUser()
        Alert.alert('Success', `You have been logged out!`);
        router.replace("/login")
    }


    render() {
        const myTasks = this.state.tasks.filter((task) => task.isOwner && !task.isDone)
        return (
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <Text
                            style={styles.textHeader}>{`Welcome, ${this.state.currentUser?.firstName}`}</Text>
                        <IconButton iconName={"logout"} buttonText={"Logout"} buttonStyle={{backgroundColor: "#616161"}}
                                    onPress={this.logout}/>
                    </View>
                    <View style={styles.listGroup}>
                        <View style={styles.newTaskGroup}>
                            <IconButton iconName={"add"} buttonText={"New task"} onPress={() => {
                            }}/>
                            <IconButton iconName={"refresh"} buttonText={""} buttonStyle={{backgroundColor: "#212121"}}
                                        onPress={() => this.loadTasks(this.state.currentUser!.userId)}/>
                        </View>


                        <FlatList data={myTasks} renderItem={({item}) => <Task taskId={item.taskId} title={item.title}
                                                                               description={item.description}
                                                                               date={item.date}
                                                                               isDone={item.isDone}
                                                                               isOwner={item.isOwner}
                                                                               firstName={item.firstName}
                                                                               lastName={item.lastName}
                                                                               toggleTaskDone={() => this.toggleTaskDone(item.taskId, !item.isDone)}/>}
                                  keyExtractor={(item) => item.taskId}
                        /></View>
                </SafeAreaView>
            </SafeAreaProvider>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        gap: 30
    },
    header: {
        display: 'flex',
        flexDirection: "row",
        padding: 15,
        justifyContent: "space-between",
        alignItems: "center"
    },
    textHeader: {
        fontSize: 25,
        fontWeight: "bold"
    },
    newTaskGroup: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        paddingHorizontal: 5,
    },
    listGroup: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        paddingBottom: 40,
    }
})