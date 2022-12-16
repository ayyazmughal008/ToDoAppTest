import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NavStack} from './src/AuthNavigator';
import {MainStack} from './src/MainNavigator';
import {useSelector} from 'react-redux';
import {navigationRef} from './src/AuthNavigator/NavigationService';

const MainApp = () => {
  const loginData = useSelector(state => state.user.login);
  return (
    <NavigationContainer ref={navigationRef}>
      {!loginData ? <NavStack /> : <MainStack />}
    </NavigationContainer>
  );
};
export default MainApp;
