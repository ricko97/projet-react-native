import AsyncStorage from "@react-native-async-storage/async-storage";


export const isLoggedIn = async () => {
    return await AsyncStorage.getItem("isLoggedIn")
}

export const getCurrentUser = async () => {
    return await AsyncStorage.getItem("currentUser")
}

export const setCurrentUser = async (userData: string) => {
    await AsyncStorage.setItem("@isLoggedIn", '1')
    await AsyncStorage.setItem("@currentUser", userData)
}

export const logoutUser = async () => {
    await AsyncStorage.setItem("@isLoggedIn", '0')
    await AsyncStorage.removeItem("@currentUser")
}