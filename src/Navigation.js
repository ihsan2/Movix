// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import HomePages from './pages/Home';
import DetailPages from './pages/Detail';
import VideoPlayer from './pages/VideoPlayer';
import Splash from './pages/Splash';

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomePages}
          options={{title: 'Movie List', headerLeft: () => null}}
        />
        <Stack.Screen
          name="Detail"
          component={DetailPages}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Video"
          component={VideoPlayer}
          options={{
            title: 'Movie Trailer',
            headerStyle: {
              backgroundColor: 'rgba(52, 51, 54, 1)',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
