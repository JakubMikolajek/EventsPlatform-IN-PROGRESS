import React from "react";
import {StyleSheet, Text} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import {useFetchEvent} from "../../hooks/useFetchEvent";
import Loading from "../../components/Loading/Loading";

const EventsScreen: React.FC = () => {
    const {events, isLoading, isFetching, refetch} = useFetchEvent(true)

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? <Loading/> : <Text>EventsScreen</Text>}
        </SafeAreaView>
    )
}

export default EventsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    }
})
