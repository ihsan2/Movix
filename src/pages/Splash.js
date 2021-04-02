import React, {useEffect} from 'react';
import {SafeAreaView, Image, StyleSheet, ActivityIndicator} from 'react-native';
import logo from '../assets/logo.png';
import {primaryColor} from '../constants';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.body}>
      <Image source={logo} />
      <ActivityIndicator
        color={primaryColor}
        size={'large'}
        style={styles.load}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  load: {
    position: 'absolute',
    bottom: 50,
  },
});
export default Splash;
