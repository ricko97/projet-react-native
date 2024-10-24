import {StyleSheet, Text, View} from "react-native";
import {getCurrentUser} from "@/services/user";
import React, {Component} from "react";
import {User} from "@/services/models";


interface State {
    currentUser: User | null;
}

export default class Home extends Component<{}, State> {

    constructor(props: {}) {
        super(props);
        this.state = {
            currentUser: null
        }
    }


    async componentDidMount() {
        const user_data = await getCurrentUser();
        this.setState({currentUser: JSON.parse(user_data!)})
    }


    render() {
        return (
            <View>

            </View>
        )
    }

}

const styles = StyleSheet.create({})