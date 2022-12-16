import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import reducer from './reducer';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user'],
    // blacklist: ['login']
};
const persistedReducer = persistReducer(persistConfig, reducer);
const Store = configureStore({
    middleware: [thunk],
    reducer: persistedReducer,
});
const persistor = persistStore(Store);

module.exports = { Store, persistor };
