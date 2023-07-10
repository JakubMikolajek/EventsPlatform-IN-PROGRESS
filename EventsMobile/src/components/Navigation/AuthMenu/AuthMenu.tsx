import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationProp, ParamListBase, useNavigation} from "@react-navigation/native";
import EventsScreen from "../../../screens/EventsScreen/EventsScreen";
import Icon from "../../Others/Icon/Icon";
import ProfileScreen from "../../../screens/ProfileScreen/ProfileScreen";
import AddEventScreen from "../../../screens/AddEventScreen/AddEventScreen";
import {globalStyles} from "../../../utils/variables/globalStyles";
import {createStackNavigator} from "@react-navigation/stack";
import SettingScreen from "../../../screens/SettingScreen/SettingScreen";
import EditProfileScreen from "../../../screens/EditProfileScreen/EditProfileScreen";
import ResetPasswordScreen from "../../../screens/ResetPasswordScreen/ResetPasswordScreen";

const Tabs = createBottomTabNavigator<ParamListBase>()
const Stack = createStackNavigator<ParamListBase>()

const AccountMenu = () => {
    const navigation: NavigationProp<ParamListBase> = useNavigation()

    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen} options={{
                headerTransparent: true,
                title: "",
                headerRight: () => <Icon name="settings" size={25} color={globalStyles.colors.light.main_blue}
                                         onPress={() => navigation.navigate("Setting")}/>,
                headerRightContainerStyle: {marginRight: 10}
            }}/>
            <Stack.Screen name="Setting" component={SettingScreen} options={{
                headerTransparent: true,
                title: ""
            }}/>
            <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{
                headerTransparent: true,
                title: ""
            }}/>
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{
                headerTransparent: true,
                title: ""
            }}/>
        </Stack.Navigator>
    )
}

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
            <Tabs.Screen name="Account" component={AccountMenu} options={{
                tabBarIcon: ({size, color}) => <Icon name="account-circle" size={size} color={color}/>
            }}/>
        </Tabs.Navigator>
    )
}

export default AuthMenu

