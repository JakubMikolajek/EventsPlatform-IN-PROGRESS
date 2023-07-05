import React from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from "react-redux";
import {store} from "./src/store/store";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import RootMenu from "./src/components/Navigation/RootMenu/RootMenu";

const App: React.FC = () => {
    const queryClient: QueryClient = new QueryClient()

    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <RootMenu/>
                </QueryClientProvider>
            </Provider>
        </SafeAreaProvider>
    );
}

export default App
