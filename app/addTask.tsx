import React, {Component} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {getCurrentUser} from "@/services/user";
import {User} from "@/services/models";
import {addTask} from "@/services/api";
import {router} from "expo-router";

interface State {
    title: string;
    description: string;
    currentUser: User | null;
}

class AddTask extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            title: '',
            description: '',
            currentUser: null
        };
    }

    async componentDidMount() {
        const data = await getCurrentUser();
        const user = JSON.parse(data!) as User
        this.setState({currentUser: user})
    }

    handleAddTask = () => {
        const {title, description} = this.state;

        if (!title || !description) {
            Alert.alert('Error', 'Both fields are required');
            return;
        }

        const userId = this.state.currentUser!.userId
        addTask({userId, title, description}).then(_ => {
            console.log({userId, title, description})
            Alert.alert('Success', `Task: "${title}" has been created! `);
            // Clear the input fields
            this.setState({title: '', description: ''});
        }).catch(err => {
            Alert.alert('Something went wrong', `${err}`);
        })
        router.push("/home")
    };

    render() {
        const {title, description} = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.heading}>New Task</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Task Title"
                    value={title}
                    onChangeText={(text) => this.setState({title: text})}
                />

                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Task Description"
                    value={description}
                    onChangeText={(text) => this.setState({description: text})}
                    multiline={true}
                    numberOfLines={4}
                />

                <Button title="Add Task" onPress={this.handleAddTask}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginBottom: 15,
        backgroundColor: 'white',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
});

export default AddTask;
