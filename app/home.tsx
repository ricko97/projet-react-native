import {Alert, FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {getCurrentUser, logoutUser} from "@/services/user";
import React, {Component} from "react";
import {TaskUser, User} from "@/services/models";
import {getTasks, updateTask, deleteTask} from "@/services/api";
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
        res.tasks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        this.setState({tasks: res.tasks});
    }

    async toggleTaskDone(taskId: string, isDone: boolean) {
        Alert.alert(`Mark as completed`,
            'Do you want to complete this task?',
            [
                {
                    text: 'Yes', onPress: () => {
                        const userId = this.state.currentUser!.userId
                        updateTask({userId, taskId, isDone}).then(async _ => {
                            await this.loadTasks(userId)
                        }).catch(error => {
                            Alert.alert('Something went wrong', `${error}!`);
                        })
                    }
                },
                {text: 'No', style: 'cancel'},
            ],
        )

    }

    deleteTask(taskId: string) {
        Alert.alert(`Delete this task`,
            'Are you sure you want to proceed?',
            [
                {text: 'No', style: 'cancel'},
                {
                    text: 'Yes', onPress: () => {
                        const userId = this.state.currentUser!.userId
                        deleteTask({userId, taskId}).then(async _ => {
                            Alert.alert('Success', `Task deleted successfully!`);
                            await this.loadTasks(userId)
                        }).catch(error => {
                            Alert.alert('Something went wrong', `${error}!`);
                        })
                    }
                },
            ],
        )
    }

    updateTask(taskId: string) {
        router.navigate({pathname: "/updateTask", params: {taskId: taskId}})
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
                        <View style={styles.buttonsGroup}>
                            <View style={styles.newTaskGroup}>
                                <IconButton iconName={"add"} buttonText={"New task"}
                                            buttonStyle={{backgroundColor: "#03A9F4"}}
                                            onPress={() => router.push("/addTask")}/>
                                <IconButton iconName={"refresh"} buttonText={""}
                                            buttonStyle={{backgroundColor: "#212121"}}
                                            onPress={() => this.loadTasks(this.state.currentUser!.userId)}/>
                            </View>

                            <Text style={styles.totalItems}>{`Total: ${myTasks.length}`}</Text>
                        </View>


                        <FlatList data={myTasks} renderItem={({item}) => <Task taskId={item.taskId} title={item.title}
                                                                               description={item.description}
                                                                               date={item.date}
                                                                               isDone={item.isDone}
                                                                               isOwner={item.isOwner}
                                                                               firstName={item.firstName}
                                                                               lastName={item.lastName}
                                                                               toggleTaskDone={() => this.toggleTaskDone(item.taskId, !item.isDone)}
                                                                               deleteTask={() => this.deleteTask(item.taskId)}
                                                                               updateTask={() => this.updateTask(item.taskId)}/>}
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
    listGroup: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        paddingBottom: 40,
    },
    newTaskGroup: {
        flex: 1,
        flexDirection: "row",
        gap: 5,
    },
    buttonsGroup: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 5,
        paddingHorizontal: 5,
    },
    totalItems: {
        alignSelf: 'flex-end',
        fontWeight: "bold",
        marginEnd: 10
    }
})