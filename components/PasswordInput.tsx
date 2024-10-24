import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const PasswordInput = ({
                           value,
                           onChangeText,
                           placeholder = 'Enter your password',
                           iconSize = 24,
                           iconColor = 'gray',
                           inputStyle = {},
                           containerStyle = {},
                           secureTextEntryIcon = 'eye',
                           secureTextOffEntryIcon = 'eye-off',
                       }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={[styles.inputContainer, containerStyle]}>
            <TextInput
                style={[styles.textInput, inputStyle]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
                <Icon
                    name={isPasswordVisible ? secureTextOffEntryIcon : secureTextEntryIcon}
                    size={iconSize}
                    color={iconColor}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    textInput: {
        flex: 1,
        paddingVertical: 5,
        fontSize: 16,
    },
    icon: {
        paddingHorizontal: 10,
    },
});

export default PasswordInput;
