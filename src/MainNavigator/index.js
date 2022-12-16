import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ToDoList from '../Screens/ToDoList'
import CreateNewList from '../Screens/CreateNewList'
import UpdateList from '../Screens/UpdateList';

const Stack = createStackNavigator();

export const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ToDoList"
                component={ToDoList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CreateNewList"
                component={CreateNewList}
                options={{ headerShown: false }}
            />
             <Stack.Screen
                name="UpdateList"
                component={UpdateList}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}