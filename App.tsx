/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useRoute } from '@react-navigation/native';

import Home from './src/Home'
import Navbar from './components/Navbar';
import Test from './src/Chat';
import SetupStudyLocation from './src/SetupStudyLocation';
import AccountSettings from './src/AccountSettings';
import PrivacySettings from './src/PrivacySettings';
import FindBuddy from './src/FindBuddy';
import RequestNotif from './src/RequestNotif';
import Chats from './src/Chats';
import { RootStackParamList } from './navigation/Types';

import RegisterPage from './src/RegisterPage';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Chat from './src/Chat';
import { Request } from './src/Request';
import SendRequest from './src/SendRequest';
import LoginPage from './src/LoginPage';
import SelectFindingMethod from './src/SelectFindingMethod';


const Stack = createNativeStackNavigator<RootStackParamList>();
function App(): React.JSX.Element {
  const [showNavbar, setShowNavbar] = useState(true)
  const handleScreenChange = (currentRoute:any) =>{
    if(currentRoute=='Chat'){
      setShowNavbar(false)
    }
    else{
      setShowNavbar(true)
    }
  }
  return (
    <Provider store={store}>
      <NavigationContainer onStateChange={(state)=>handleScreenChange(state.routes[state.index].name)}>
        <Stack.Navigator>
          <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterPage" component={RegisterPage} options={{headerShown:false}} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={Chat} options={{headerShown:false}}/>
          <Stack.Screen name="SetupStudyLocation" component={SetupStudyLocation} options={{ headerShown: false }} />
          <Stack.Screen name="AccountSettings" component={AccountSettings} options={{ headerShown: false }} />
          <Stack.Screen name="PrivacySettings" component={PrivacySettings} options={{ headerShown: false }}/>
          <Stack.Screen name="FindBuddy" component={FindBuddy} options={{ headerShown: false }} />
          <Stack.Screen name="RequestNotif" component={RequestNotif} options={{ headerShown: false }} />
          <Stack.Screen name="Chats" component={Chats} options={{ headerShown: false }} />
          <Stack.Screen name="Request" component={Request} options={{ headerShown: false }}/>
          <Stack.Screen name="SendRequest" component={SendRequest} options={{ headerShown: false }}/>
          <Stack.Screen name="SelectFindingMethod" component={SelectFindingMethod} options={{headerShown: false}}/>
        </Stack.Navigator>
        {showNavbar?<Navbar />:<></>}
      </NavigationContainer>
    </Provider>

  );
}

export default App;
