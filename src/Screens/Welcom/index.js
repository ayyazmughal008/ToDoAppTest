//import liraries
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {styles} from '../../Utils/styles';

// create a component
const Welcome = props => {
  return (
    <View
      style={[
        styles.container,
        {justifyContent: 'center', alignItems: 'center'},
      ]}>
      <Text style={styles.loginTitle}>
        {'Welcome to '}
        {'\n'}
        {'ToDo Application'}
      </Text>
      <View style={styles.loginContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Login')}
          style={styles.btn}>
          <Text style={styles.brnText}>{'Login'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Signup');
          }}
          style={[styles.btn, {marginVertical: 0}]}>
          <Text style={styles.brnText}>{'Sign Up'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

//make this component available to the app
export default Welcome;
