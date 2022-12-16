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
import {createUserItem} from '../../Redux/action';
import Loader from '../../Components/Loader';

const NewList = props => {
  const AuthLoading = useSelector(state => state.user.AuthLoading);
  const login = useSelector(state => state.user.login);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const validate = () => {
    if (!title) {
      Alert.alert('', 'Please enter a title');
      return;
    }
    if (!description) {
      Alert.alert('', 'Password enter the description`');
      return;
    }
    dispatch(createUserItem(login, title, description));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        <Text style={styles.loginTitle}>Create Item List</Text>
        <View style={styles.loginContainer}>
          <TextInput
            placeholder="Enter Title"
            placeholderTextColor={Colors.primarayColor}
            onChangeText={text => setTitle(text)}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Enter Description"
            placeholderTextColor={Colors.primarayColor}
            onChangeText={text => setDescription(text)}
            secureTextEntry={true}
            style={[
              styles.textInput,
              {marginVertical: heightPercentageToDP(2), height: heightPercentageToDP(20),textAlignVertical:"top"},
            ]}
            multiline = {true}
          />
          <TouchableOpacity onPress={() => validate()} style={styles.btn}>
            <Text style={styles.brnText}>{'Submit'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      {AuthLoading && <Loader />}
    </SafeAreaView>
  );
};

export default NewList;
