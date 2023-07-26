import React from "react";
import {StyleSheet, Text, View} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "../../components/Header/Header";
import {globalStyles} from "../../utils/variables/globalStyles";
import {useFetchEventsByCategory} from "../../hooks/useFetchEventsByCategory";
import Loading from "../../components/Loading/Loading";
import EventsListV2 from "../../components/Lists/EventsListV2/EventsListV2";

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        alignItems: "center",
        marginTop: globalStyles.spacing.sm,
        marginBottom: globalStyles.spacing.lg
    }
})
