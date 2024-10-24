import React, {useState} from 'react';
import {View, Text, Switch, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import {TaskUser} from "@/services/models";
import {MaterialIcons} from "@expo/vector-icons";
import Badge from "@/components/Badge";
import {truncateText} from "@/services/utils";

interface TaskProps extends TaskUser {
    toggleTaskDone?: () => void;
    deleteTask?: (taskId: string) => void;
    updateTask?: (taskId: string) => void;
}

const Task: React.FC<TaskProps> = ({
                                       taskId, title, description,
                                       date, isDone, isOwner, firstName, lastName,
                                       toggleTaskDone, deleteTask, updateTask
                                   }) => {


    return (
        <View style={styles.taskContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description} numberOfLines={2}>{description}</Text>
            <Text style={styles.date}>Created at: {new Date(date).toLocaleString('en-CA', {
                timeZone: 'America/New_York',
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            })}</Text>
            <View style={styles.taskActions}>
                <Text>{isDone ? <Badge backgroundColor={"transparent"}
                                       textColor={"#388E3C"}
                                       iconColor={"#388E3C"}
                                       value={"Completed"}
                                       iconName={"done-all"}/> : <Badge backgroundColor={"transparent"}
                                                                        textColor={"#FFA000"}
                                                                        iconColor={"#FFA000"}
                                                                        value={"Pending"}
                                                                        iconName={"schedule"}/>}</Text>

                {isOwner ? <View style={styles.taskButtons}>
                    <Switch
                        value={isDone}
                        onValueChange={toggleTaskDone}
                    />
                    {!isDone ? <View style={styles.icons}>

                        <Pressable onPress={() => (updateTask!)(taskId)}><MaterialIcons style={{cursor: "pointer"}}
                                                                                        name={"edit-note"}
                                                                                        color={"#455A64"}
                                                                                        size={28}/></Pressable>
                        <Pressable onPress={() => (deleteTask!)(taskId)}><MaterialIcons
                            style={{cursor: "pointer"}} name={"delete"} color={"#D32F2F"}
                            size={24}/></Pressable>
                    </View> : ''}
                </View> : <View style={styles.taskButtons}><Badge backgroundColor={"#455A64"}
                                                                  value={`${firstName} ${lastName}`}
                                                                  iconName={"account-circle"}/></View>}


            </View>
        </View>

    );
};

// Basic styling for the component
const styles = StyleSheet.create({
    taskContainer: {
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        marginTop: 5,
        color: '#555',
    },
    date: {
        fontSize: 12,
        marginTop: 5,
        color: '#888',
    },
    taskActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    taskButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 24
    },
    icons: {display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5}
});

export default Task;
