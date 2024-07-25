import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import api from '../_api';

const CreateUser = () => {
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userInfo, setUserInfo] = useState('');

    const router = useRouter();

    const handleSubmit = async () => {
        const newUser = { userFirstName, userLastName, userEmail, userPassword, userInfo };
        await api.post('/users', newUser);
        router.navigate('users');
    };

    return (
        <View style={[styles.container]}>
            <TextInput placeholder="First Name" value={userFirstName} onChangeText={setUserFirstName} style={[styles.input]} />
            <TextInput placeholder="Last Name" value={userLastName} onChangeText={setUserLastName} style={[styles.input]} />
            <TextInput placeholder="Email" value={userEmail} onChangeText={setUserEmail} style={[styles.input]} />
            <TextInput placeholder="Password" value={userPassword} onChangeText={setUserPassword} style={[styles.input]} secureTextEntry />
            <TextInput placeholder="Info" value={userInfo} onChangeText={setUserInfo} style={[styles.input]} />
            <Button title="Create User" onPress={handleSubmit} />
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

export default CreateUser;
