import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from '../../Utils/styles';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from '../../Utils/colors';
import {heightPercentageToDP} from '../../Components/MakeMeResponsive';
import {userSignUp} from '../../Redux/action';
import Loader from '../../Components/Loader';

const SignUp = props => {
  const AuthLoading = useSelector(state => state.user.AuthLoading);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');

  const validateEmail = email => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  };

  const validate = () => {
    if (!validateEmail(email)) {
      Alert.alert('', 'Please enter a valid email');
      return;
    }
    if (!password || password.length < 6) {
      Alert.alert('', 'Password length should be 7 character long');
      return;
    }
    if (password !== conPassword) {
      Alert.alert('', 'Password should be same');
      return
    }
    dispatch(userSignUp(email, password, conPassword));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        <Text style={styles.loginTitle}>Login Screen</Text>
        <View style={styles.loginContainer}>
          <TextInput
            placeholder="Enter Email"
            placeholderTextColor={Colors.primarayColor}
            onChangeText={text => setEmail(text)}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Enter Password"
            placeholderTextColor={Colors.primarayColor}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            style={[
              styles.textInput,
              {marginVertical: heightPercentageToDP(2)},
            ]}
          />
          <TextInput
            placeholder="Enter Confirm Password"
            placeholderTextColor={Colors.primarayColor}
            onChangeText={text => setConPassword(text)}
            secureTextEntry={true}
            style={[
              styles.textInput,
              {marginVertical: heightPercentageToDP(0)},
            ]}
          />
          <TouchableOpacity onPress={() => validate()} style={styles.btn}>
            <Text style={styles.brnText}>{'Sign Up'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      {AuthLoading && <Loader />}
    </SafeAreaView>
  );
};

export default SignUp;
