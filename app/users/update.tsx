import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import api from '../_api';
import { useRouter, useLocalSearchParams } from 'expo-router';

const UpdateUser = ({  }) => {
    const {email} = useLocalSearchParams(); 
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userInfo, setUserInfo] = useState('');

    const navigation = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const response = await api.get(`/users/${email}`);
            const user = response.data;
            setUserFirstName(user.userFirstName);
            setUserLastName(user.userLastName);
            setUserPassword(user.userPassword);
            setUserInfo(user.userInfo);
        };
        fetchUser();
    }, [email]);

    const handleSubmit = async () => {
        const updatedUser = { userFirstName, userLastName, userPassword, userEmail: email, userInfo };
        await api.put(`/users/${email}`, updatedUser);
        navigation.navigate('users');
    };

    return (
        <View style={[styles.container]}>
            <TextInput placeholder="First Name" value={userFirstName} onChangeText={setUserFirstName} style={[styles.input]} />
            <TextInput placeholder="Last Name" value={userLastName} onChangeText={setUserLastName} style={[styles.input]} />
            <TextInput placeholder="Password" value={userPassword} onChangeText={setUserPassword} style={[styles.input]} secureTextEntry />
            <TextInput placeholder="Info" value={userInfo} onChangeText={setUserInfo} style={[styles.input]} />
            <Button title="Update User" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
});

export default UpdateUser;
