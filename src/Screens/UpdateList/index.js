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
import {UpdateUserItem} from '../../Redux/action';
import Loader from '../../Components/Loader';

const UpdateList = props => {
  const titles = props.route.params.title;
  const descriptions = props.route.params.description;
  const itemId = props.route.params.itemId;
  const AuthLoading = useSelector(state => state.user.AuthLoading);
  const login = useSelector(state => state.user.login);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(titles);
  const [description, setDescription] = useState(descriptions);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    console.log('my list data', titles, descriptions, itemId);
  }, []);

  const validate = () => {
    if (!title) {
      Alert.alert('', 'Please enter a title');
      return;
    }
    if (!description) {
      Alert.alert('', 'Password enter the description`');
      return;
    }
    updateRequest();
  };
  const updateRequest = async () => {
    setLoading(true);
    const result = await UpdateUserItem(login, description, itemId);
    setLoading(false);
    console.log('my update response', result);
    if (result.success) {
      Alert.alert('', 'Update item successfully');
      props.navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        <Text style={styles.loginTitle}>Update Item List</Text>
        <View style={styles.loginContainer}>
          <TextInput
            value={title}
            placeholder="Enter Title"
            placeholderTextColor={Colors.primarayColor}
            onChangeText={text => setTitle(text)}
            style={styles.textInput}
            editable = {false}
          />
          <TextInput
            value={description}
            placeholder="Enter Description"
            placeholderTextColor={Colors.primarayColor}
            onChangeText={text => setDescription(text)}
            secureTextEntry={true}
            style={[
              styles.textInput,
              {
                marginVertical: heightPercentageToDP(2),
                height: heightPercentageToDP(20),
                textAlignVertical: 'top',
              },
            ]}
            multiline={true}
          />
          <TouchableOpacity onPress={() => validate()} style={styles.btn}>
            <Text style={styles.brnText}>{'Submit'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      {isLoading && <Loader />}
    </SafeAreaView>
  );
};

export default UpdateList;
