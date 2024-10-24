import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface BadgeProps {
    value: string | number;
    backgroundColor?: string;
    textColor?: string;
}

const Badge: React.FC<BadgeProps> = ({
                                         value,
                                         backgroundColor = 'red',
                                         textColor = 'white',
                                     }) => {
    return (
        <View style={[styles.badge, {backgroundColor}]}>
            <Text style={[styles.badgeText, {color: textColor}]}>{value}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    badge: {
        minWidth: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20, // Circular badge
        backgroundColor: 'red', // Default background color
        justifyContent: 'center',
        marginLeft: 10,
    },
    badgeText: {
        fontSize: 10,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Badge;
