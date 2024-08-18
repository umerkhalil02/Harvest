import { AppRegistry, Image, View } from 'react-native';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import App from './App';

const queryClient = new QueryClient();

export default function Root() {

    return (
        <Provider store={store}>
            <PersistGate loading={
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
                    <Image source={require('./assets/Logo.png')} style={{ width: 50, height: 50 }} />
                </View>
            } persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </PersistGate>
        </Provider>
    );
}

AppRegistry.registerComponent(appName, () => Root);
