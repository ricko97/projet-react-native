import React, {useState} from 'react';
import {View, Text, Switch, StyleSheet, TouchableOpacity} from 'react-native';
import {TaskUser} from "@/services/models";
import {MaterialIcons} from "@expo/vector-icons";
import Badge from "@/components/Badge";
import {truncateText} from "@/services/utils";


const Task: React.FC<TaskUser> = ({
                                      taskId, title, description,
                                      date, isDone, isOwner, firstName, lastName
                                  }) => {
    const [completed, setCompleted] = useState(isDone);

    const toggleTaskDone = () => {
        setCompleted(!completed);
    };

    return (
        <View style={styles.taskContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description} numberOfLines={2}>{description}</Text>
            <Text style={styles.date}>Created at: {date}</Text>
            <View style={styles.taskActions}>
                <Text>{completed ? 'Completed' : 'Pending'}</Text>

                {isOwner ? <View style={styles.taskButtons}>
                    <Switch
                        value={completed}
                        onValueChange={toggleTaskDone}
                    />
                    <View style={styles.icons}>
                        <MaterialIcons style={{cursor: "pointer"}} name={"edit-note"} color={"#455A64"} size={28}/>
                        <MaterialIcons style={{cursor: "pointer"}} name={"delete"} color={"#D32F2F"} size={24}/>
                    </View>
                </View> : <View style={styles.taskButtons}><Badge backgroundColor={"#455A64"}
                                                                  value={`${firstName} ${lastName}`}/></View>}


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
