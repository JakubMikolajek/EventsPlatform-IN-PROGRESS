import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {ParamListBase} from "@react-navigation/native";

import LoginScreen from "../../../screens/LoginScreen/LoginScreen";
import RegisterScreen from "../../../screens/RegisterScreen/RegisterScreen";
import EventsScreen from "../../../screens/EventsScreen/EventsScreen";
import {createStackNavigator} from "@react-navigation/stack";
import Icon from "../../Others/Icon/Icon";
import {globalStyles} from "../../../utils/variables/globalStyles";

const Tabs = createBottomTabNavigator<ParamListBase>()
const Stack = createStackNavigator<ParamListBase>()

const AccountMenu = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{headerTransparent: true, title: ""}}/>
        </Stack.Navigator>
    )
}

const GuessMenu = () => {
    return (
        <Tabs.Navigator initialRouteName="Events" screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: globalStyles.colors.light.main_blue,
        }}>
            <Tabs.Screen name="Events" component={EventsScreen} options={{
                tabBarIcon: ({size, color}) => <Icon name="event" size={size} color={color}/>
            }}/>
            <Tabs.Screen name="Auth" component={AccountMenu} options={{
                tabBarIcon: ({size, color}) => <Icon name="account-circle" size={size} color={color}/>
            }}/>
        </Tabs.Navigator>
    )
}

export default GuessMenu
