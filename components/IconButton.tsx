import React from 'react';
import {TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IconButtonProps {
    iconName: string;
    iconSize?: number;
    iconColor?: string;
    buttonText: string;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
    onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
                                                   iconName,
                                                   iconSize = 24,
                                                   iconColor = 'white',
                                                   buttonText,
                                                   buttonStyle,
                                                   textStyle,
                                                   onPress,
                                               }) => {
    return (
        <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
            <Icon name={iconName} size={iconSize} color={iconColor}/>
            <Text style={[styles.buttonText, textStyle]}>{buttonText}</Text>
        </TouchableOpacity>
    );
};

// Default styles
const styles = StyleSheet.create({
    button: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007bff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 5,
    },
});

export default IconButton;
