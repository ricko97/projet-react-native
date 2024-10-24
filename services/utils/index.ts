import {isLoggedIn} from "@/services/user";
import {router} from "expo-router";

export const truncateText = (text: string, nbCharacters: number = 25) => {
    return text.length > 20 ? text.substring(0, nbCharacters) + "..." : text;
}

export const userConnected = async () => {
    const res = await isLoggedIn()
    if (res != null && res == '1') {
        router.replace("/home")
    }
}