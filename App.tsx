/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useRoute } from '@react-navigation/native';

import Home from './src/Home'
import Navbar from './components/Navbar';
import Test from './src/Test';
import SetupStudyLocation from './src/SetupStudyLocation';
import AccountSettings from './src/AccountSettings';
import PrivacySettings from './src/PrivacySettings';
import FindBuddy from './src/FindBuddy';
import RequestNotif from './src/RequestNotif';
import Chats from './src/Chats';
import { RootStackParamList } from './navigation/Types';
import Login from './src/LoginPage';
import RegisterPage from './src/RegisterPage';
import { Provider } from 'react-redux';
import { store } from './redux/store';


const Stack = createNativeStackNavigator<RootStackParamList>();
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginPage" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterPage" component={RegisterPage} options={{headerShown:false}} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Test" component={Test} />
          <Stack.Screen name="SetupStudyLocation" component={SetupStudyLocation} />
          <Stack.Screen name="AccountSettings" component={AccountSettings} />
          <Stack.Screen name="PrivacySettings" component={PrivacySettings} />
          <Stack.Screen name="FindBuddy" component={FindBuddy} options={{ headerShown: false }} />
          <Stack.Screen name="RequestNotif" component={RequestNotif} options={{ headerShown: false }} />
          <Stack.Screen name="Chats" component={Chats} options={{ headerShown: false }} />
        </Stack.Navigator>
        <Navbar />
      </NavigationContainer>
    </Provider>

  );
}

export default App;
