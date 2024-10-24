import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

interface BadgeProps {
    value: string | number;
    iconName: string;
    iconColor?: string;
    backgroundColor?: string;
    textColor?: string;
}

const Badge: React.FC<BadgeProps> = ({
                                         value,
                                         iconName,
                                         iconColor = 'white',
                                         backgroundColor = 'red',
                                         textColor = 'white',
                                     }) => {
    return (
        <View style={[styles.badge, {backgroundColor}]}>
            <Icon name={iconName} size={15} color={iconColor}/>
            <Text style={[styles.badgeText, {color: textColor}]}>{value}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    badge: {
        display: "flex",
        flexDirection: "row",
        minWidth: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20, // Circular badge
        backgroundColor: 'red', // Default background color
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        marginLeft: 10,
    },
    badgeText: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Badge;
