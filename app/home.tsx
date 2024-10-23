import {Text} from "react-native";
import {getCurrentUser} from "@/services/user";
import React from "react";


export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: ""
        }
    }

    async componentDidMount() {
        this.setState({user: getCurrentUser})
    }


    render() {
        return <Text>Welcome {this.state.user}</Text>
    }

}
