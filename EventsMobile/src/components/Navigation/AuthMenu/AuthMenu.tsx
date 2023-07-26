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
import EventDetailScreen from "../../../screens/EventDetailScreen/EventDetailScreen";
import CategoryScreen from "../../../screens/CategoryScreen/CategoryScreen";

const Tabs = createBottomTabNavigator<ParamListBase>()
const Stack = createStackNavigator<ParamListBase>()

const TabsMenu = () => {
    const navigation: NavigationProp<ParamListBase> = useNavigation()

    return (
        <Tabs.Navigator initialRouteName="Event" screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: globalStyles.colors.light.main_blue
        }}>
            <Tabs.Screen name="Events" component={EventsScreen} options={{
                headerShown: false,
                tabBarIcon: ({size, color}) => <Icon name="event" size={size} color={color}/>
            }}/>
            <Tabs.Screen name="AddEvent" component={AddEventScreen} options={{
                headerShown: false,
                tabBarIcon: ({size, color}) => <Icon name="add" size={size} color={color}/>
            }}/>
            <Tabs.Screen name="Profile" component={ProfileScreen} options={{
                headerTransparent: true,
                title: "",
                tabBarIcon: ({size, color}) => <Icon name="account-circle" size={size} color={color}/>,
                headerRight: () => <Icon name="settings" size={25} color={globalStyles.colors.light.main_blue}
                                         onPress={() => navigation.navigate("Setting")}/>,
                headerRightContainerStyle: {marginRight: 10}
            }}/>
        </Tabs.Navigator>
    )
}

const AuthMenu: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="Tabs">
            <Stack.Screen name="Tabs" component={TabsMenu} options={{
                headerShown: false
            }}/>
            <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{
                headerTransparent: true,
                title: ""
            }}/>
            <Stack.Screen name="Category" component={CategoryScreen} options={{
                headerTransparent: true,
                title: ""
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

export default AuthMenu

