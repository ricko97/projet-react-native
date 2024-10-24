import {FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {getCurrentUser} from "@/services/user";
import React, {Component} from "react";
import {TaskUser, User} from "@/services/models";
import {getTasks} from "@/services/api";
import Task from "@/components/Task";
import {SafeAreaProvider} from "react-native-safe-area-context";
import IconButton from "@/components/IconButton";


interface State {
    currentUser: User | null;
    tasks: TaskUser[]
}

export default class Others extends Component<{}, State> {

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

        const res = await getTasks(user.userId);
        this.setState({tasks: res.tasks});
    }


    render() {
        const myTasks = this.state.tasks.filter((task) => !task.isOwner && !task.isDone)
        return (
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <View style={styles.listGroup}>
                        <View style={styles.newTask}>
                            <IconButton iconName={"add"} buttonText={"New task"} onPress={() => {
                            }}/>
                        </View>


                        <FlatList data={myTasks} renderItem={({item}) => <Task taskId={item.taskId} title={item.title}
                                                                               description={item.description}
                                                                               date={item.date}
                                                                               isDone={item.isDone}
                                                                               isOwner={item.isOwner}
                                                                               firstName={item.firstName}
                                                                               lastName={item.lastName}/>}
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
    newTask: {
        width: '35%',
        paddingHorizontal: 5,
        marginBottom: 0,
    },
    listGroup: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        marginTop: 30,
        paddingBottom: 40,
    }
})