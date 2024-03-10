/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './src/Home'
import Navbar from './components/Navbar';
import { StyleSheet } from 'react-native';
import Test from './src/Test';
import SetupStudyLocation from './src/SetupStudyLocation';
import AccountSettings from './src/AccountSettings';
import PrivacySettings from './src/PrivacySettings';
import FindBuddy from './src/FindBuddy';
import RequestNotif from './src/RequestNotif';
import Chats from './src/Chats';
import { RootStackParamList } from './navigation/Types';
const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Test" component={Test}/>
        <Stack.Screen name="SetupStudyLocation" component={SetupStudyLocation}/>
        <Stack.Screen name="AccountSettings" component={AccountSettings}/>
        <Stack.Screen name="PrivacySettings" component={PrivacySettings}/>
        <Stack.Screen name="FindBuddy" component={FindBuddy}/>
        <Stack.Screen name="RequestNotif" component={RequestNotif}/>
        <Stack.Screen name="Chats" component={Chats}/>
      </Stack.Navigator>
      <Navbar/>
    </NavigationContainer>
  );
}

export default App;
