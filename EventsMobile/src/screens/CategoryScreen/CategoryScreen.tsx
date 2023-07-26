import React from "react";
import {View} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";

import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";
import EventsListV2 from "../../components/Lists/EventsListV2/EventsListV2";

import {styles} from "./styles";
import {useFetchEventsByCategory} from "../../hooks/useFetchEventsByCategory";

interface CategoryScreenProps {
    route: any
}

const CategoryScreen: React.FC<CategoryScreenProps> = ({route}) => {
    const category = route.params.category

    const {events, isLoading} = useFetchEventsByCategory(category, true)

    console.log(events)

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? <Loading/> : <>
                <View style={styles.headerContainer}>
                    <Header variant="h5">{category}</Header>
                </View>
                <EventsListV2 events={events}/>
            </>}
        </SafeAreaView>
    )
}

export default CategoryScreen
