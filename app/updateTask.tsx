import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {router, useRouter} from "expo-router";
import {useRoute} from "@react-navigation/core";
import {TaskUser, User} from "@/services/models";
import {getTasks, updateTask} from "@/services/api";
import {getCurrentUser} from "@/services/user";

const UpdateTask = () => {
    const route = useRoute()

    let task: any = {}
    const [taskId, setTaskId] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        getCurrentUser().then(data => {
            const user = JSON.parse(data!) as User
            getTasks(user.userId).then(res => {
                // @ts-ignore
                task = res.tasks.find(task => task.taskId === route.params?.taskId);
                setTaskId(task.taskId)
                setTitle(task.title)
                setDescription(task.description)
            })
        });
    }, []);


    const handleUpdateTask = async () => {
        if (!title || !description) {
            Alert.alert('Error', 'Both fields are required');
            return;
        }
        const data = await getCurrentUser();
        const user = JSON.parse(data!) as User
        const userId = user.userId

        updateTask({userId, taskId, title, description}).then(async _ => {
            Alert.alert('Success', `Your task has been updated! `);
        }).catch(error => {
            Alert.alert('Something went wrong', `${error}!`);
        })
        router.push("/home")
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>{`Task Id: ${taskId}`}</Text>

            <TextInput
                style={styles.input}
                placeholder="Task Title"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Task Description"
                value={description}
                onChangeText={setDescription}
                multiline={true}
                numberOfLines={4}
            />

            <Button title="Update Task" onPress={handleUpdateTask}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    heading: {
        fontSize: 12,
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

export default UpdateTask;
