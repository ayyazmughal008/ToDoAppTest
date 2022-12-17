//import liraries
import React, {useEffect,useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {styles} from '../../Utils/styles';
import {useSelector, useDispatch} from 'react-redux';
import {
  getUserItemsList,
  logout,
  delteUserItem,
  refreshMyToken,
  getUserSingleItem,
} from '../../Redux/action';
import Loader from '../../Components/Loader';
import {useIsFocused} from '@react-navigation/native';
import {widthPercentageToDP} from '../../Components/MakeMeResponsive';
import jwt_decode from 'jwt-decode';

// create a component
const ToDoList = props => {
  const isFocused = useIsFocused();
  const disptach = useDispatch();
  const AuthLoading = useSelector(state => state.user.AuthLoading);
  const login = useSelector(state => state.user.login);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse, responseRef] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  var decoded = jwt_decode(login);

  useEffect(() => {
    if (isFocused) {
      if (login) {
        if (!isTokenExpired(login)) {
          console.log('call from start here');
          getListItemsApi(page);
        } else {
          disptach(refreshMyToken(login));
        }
      }
    }
    return () => {
      setResponse([]);
      setSearch('');
      setPage(1);
    };
  }, [isFocused, login]);
  useEffect(() => {
    if (page > 1) {
      if (!isTokenExpired(login)) {
        console.log('call from on page increase');
        getListItemsApi(page);
      } else {
        disptach(refreshMyToken(login));
      }
    }
  }, [page]);
  const loadMoreData = () => {
    setPage(page + 1);
  };
  const isTokenExpired = token => {
    decoded = jwt_decode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    } else {
      return false;
    }
  };
  const getListItemsApi = async page => {
    setLoading(true);
    const result = await getUserItemsList(login, page);
    setLoading(false);
    if (result?.message === 'Unauthenticated') {
      return;
    } else {
      setResponse([...response, ...result?.items?.data]);
    }
  };
  const deleteCurrentItem = async (id, index2) => {
    setLoading(true);
    const result = await delteUserItem(id, login);
    setLoading(false);
    if (result?.success) {
      const temArr = [...response];
      const temArr2 = [...filteredDataSource];
      const index = temArr.splice(index2, 1);
      const index_2 = temArr2.splice(index2, 1);
      if (index > -1) {
        temArr.splice(index, 1);
      }
      if (index_2 > -1) {
        index_2.splice(index_2, 1);
      }
      setResponse(temArr);
      setFilteredDataSource(temArr2);
    }
  };
  const getSingleRequest = async id => {
    setLoading(true);
    const result = await getUserSingleItem(id, login);
    setLoading(false);
  };
  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          getSingleRequest(item.id);
        }}
        style={styles.listItems}>
        <View style={{width: widthPercentageToDP(60)}}>
          <Text style={styles.itemTitle} numberOfLines={1}>
            {item?.title}
          </Text>
          <Text style={styles.itemDescription} numberOfLines={2}>
            {item?.description}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (!isTokenExpired(login)) {
              deleteCurrentItem(item?.id, index);
            } else {
              disptach(refreshMyToken(login));
            }
          }}
          style={styles.itemBtn}>
          <Text style={[styles.brnText, {fontSize: widthPercentageToDP(4)}]}>
            {'Delete'}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  const searchFilterFunction = text => {
    if (text) {
      const newData = response.filter(item => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(response);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('CreateNewList')}
          style={{flexDirection: 'row-reverse'}}>
          <Text style={[styles.brnText, {marginTop: 10, marginRight: 10}]}>
            {'Create ToDo'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => disptach(logout())}
          style={{flexDirection: 'row-reverse'}}>
          <Text style={[styles.brnText, {marginTop: 10, marginRight: 10}]}>
            {'Logout'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.mainTitle]}>ToDo List</Text>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={text => searchFilterFunction(text)}
        value={search}
        underlineColorAndroid="transparent"
        placeholder="Search Here"
      />
      <View style={{marginTop: 10}} />
      {!response || !response?.length ? (
        <View />
      ) : (
        <FlatList
          data={search ? filteredDataSource : response}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => '_' + index}
          renderItem={_renderItem}
          onEndReachedThreshold={10}
          onEndReached={() => loadMoreData()}
        />
      )}
      {isLoading && <Loader />}
    </SafeAreaView>
  );
};

//make this component available to the app
export default ToDoList;
