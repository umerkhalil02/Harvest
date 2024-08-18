import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootState, AppDispatch } from './store';
import LoginScreen from './Screens/Login';
import ThemeScreen from './Screens/ThemeScreen';

function App() {
  const Stack = createStackNavigator();
  const token = useSelector((state: RootState) => state.user.token);
  console.log("APP", token);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}
        initialRouteName={token ? "Theme" : "Login"}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Theme" component={ThemeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
