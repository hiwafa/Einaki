import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Link, useRouter } from 'expo-router';
import api from '../_api';

const CreateUser = () => {
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [userDateOfBirth, setUserDateOfBirth] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const router = useRouter();

    const handleSubmit = async () => {
        const newUser = { userFirstName, userLastName, userEmail, userPassword, userInfo, userDateOfBirth };
        await api.post('/users', newUser);
        router.navigate('users');
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || userDateOfBirth;
        setShowDatePicker(Platform.OS === 'ios');
        setUserDateOfBirth(currentDate);
    };

    return (
        <View style={[styles.container]}>
            <TextInput placeholder="First Name" value={userFirstName} onChangeText={setUserFirstName} style={[styles.input]} />
            <TextInput placeholder="Last Name" value={userLastName} onChangeText={setUserLastName} style={[styles.input]} />
            <TextInput placeholder="Email" value={userEmail} onChangeText={setUserEmail} style={[styles.input]} />
            <TextInput placeholder="Password" value={userPassword} onChangeText={setUserPassword} style={[styles.input]} secureTextEntry />
            <TextInput placeholder="Info" value={userInfo} onChangeText={setUserInfo} style={[styles.input]} />

            {
                Platform.OS === 'web' ? 
                null :
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Text>Date of Birth:</Text>
                    <DateTimePicker
                        value={userDateOfBirth}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                </View>
            }

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
