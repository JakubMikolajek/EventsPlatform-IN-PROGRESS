import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {useSelector} from "react-redux";

import GuessMenu from "../GuessMenu/GuessMenu";
import AuthMenu from "../AuthMenu/AuthMenu";

import {StateProps} from "../../../store/store";

const RootMenu = () => {
    const isAuth = useSelector((state: StateProps) => state.auth.isAuth)

    return (
        <NavigationContainer>
            {isAuth ? <AuthMenu/> : <GuessMenu/>}
        </NavigationContainer>
    )
}

export default RootMenu

