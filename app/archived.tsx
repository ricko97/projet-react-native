import {FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {getCurrentUser} from "@/services/user";
import React, {Component} from "react";
import {TaskUser, User} from "@/services/models";
import {getTasks, updateTask} from "@/services/api";
import Task from "@/components/Task";
import {SafeAreaProvider} from "react-native-safe-area-context";
import IconButton from "@/components/IconButton";


interface State {
    currentUser: User | null;
    tasks: TaskUser[]
}

export default class Archived extends Component<{}, State> {

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
        const userId = this.state.currentUser!.userId
        updateTask({userId, taskId, isDone}).then(_ => {
            this.loadTasks(userId)
        })
    }

    render() {
        const myTasks = this.state.tasks.filter((task) => task.isDone).sort((a, b) => Number(b.isOwner) - Number(a.isOwner))
        return (
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
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
        marginTop: 30,
        paddingBottom: 40,
    }
})