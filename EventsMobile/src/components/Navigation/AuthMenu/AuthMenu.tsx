import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {ParamListBase} from "@react-navigation/native";
import EventsScreen from "../../../screens/EventsScreen/EventsScreen";
import Icon from "../../Others/Icon/Icon";
import ProfileScreen from "../../../screens/ProfileScreen/ProfileScreen";
import AddEventScreen from "../../../screens/AddEventScreen/AddEventScreen";
import {globalStyles} from "../../../utils/variables/globalStyles";

const Tabs = createBottomTabNavigator<ParamListBase>()

const AuthMenu: React.FC = () => {
    return (
        <Tabs.Navigator initialRouteName="Events" screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: globalStyles.colors.light.main_blue
        }}>
            <Tabs.Screen name="Events" component={EventsScreen} options={{
                tabBarIcon: ({size, color}) => <Icon name="event" size={size} color={color}/>
            }}/>
            <Tabs.Screen name="AddEvent" component={AddEventScreen} options={{
                tabBarIcon: ({size, color}) => <Icon name="add" size={size} color={color}/>
            }}/>
            <Tabs.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({size, color}) => <Icon name="account-circle" size={size} color={color}/>
            }}/>
        </Tabs.Navigator>
    )
}

export default AuthMenu

