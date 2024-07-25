import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import api from '../_api';
import { Link, useRouter, Redirect } from 'expo-router';

const UsersScreen = () => {

    const [users, setUsers] = useState([]);
    const router = useRouter();

    const isAdmin: any = false;
    if (isAdmin === false) return <Redirect href={'/'} />

    useEffect(() => {

        const fetchUsers = async () => {
            const response = await api.get('/users');
            setUsers(response.data);
        };
        fetchUsers();
        
    }, []);


    return (
        <View style={[styles.container]}>
            <Button title="Create User" onPress={() => router.navigate('users/create')} />
            <FlatList
                data={users}
                keyExtractor={(item) => item.userEmail}
                renderItem={({ item }) => (
                    <View>
                        <Text style={[styles.text]}>{item.userFirstName} {item.userLastName}</Text>
                        <Text style={[styles.text]}>{item.userEmail}</Text>
                        <Link href={`/users/update?email=${item.userEmail}`}>Update</Link>
                        <Button title="Delete" onPress={() => handleDelete(item.userEmail)} />
                    </View>
                )}
            />
        </View>
    );
};

const handleDelete = async (email) => {
    await api.delete(`/users/${email}`);
    // Refresh user list after deletion
    const response = await api.get('/users');
    setUsers(response.data);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    text: {
        fontSize: 18,
    },
});

export default UsersScreen;
