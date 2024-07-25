import React, { useState, useContext } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import api from '../_api';

const SearchUsers = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const response = await api.get(`/users/${query}`);
        console.log(response.data);
        setResults([response.data]);
    };

    return (
        <View style={[styles.container]}>
            <TextInput placeholder="Search by email" value={query} onChangeText={setQuery} style={[styles.input]} />
            <Button title="Search" onPress={handleSearch}/>
            <FlatList
                data={results}
                keyExtractor={(item) => item.userEmail}
                renderItem={({ item }) => (
                    <View>
                        <Text style={[styles.text]}>{item.userFirstName} {item.userLastName}</Text>
                        <Text style={[styles.text]}>{item.userEmail}</Text>
                    </View>
                )}
            />
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
    text: {
        fontSize: 18,
    },
});

export default SearchUsers;
