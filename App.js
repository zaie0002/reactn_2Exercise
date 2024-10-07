import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import Icon from 'react-native-vector-icons/MaterialIcons';

const App = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async (size = 10) => {
        try {
            const response = await fetch(`https://random-data-api.com/api/users/random_user?size=${size}`);
            const data = await response.json();
            console.log(data);
            if (size === 1) {
                setUsers(prevUsers => [data[0], ...prevUsers]);
            } else {
                setUsers(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const onRefresh = useCallback(() => {
        fetchUsers();
    }, []);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                {Platform.OS === 'ios' ? (
                    <View style={styles.textContainer}>
                        <Text style={styles.nameText}>{item.first_name}</Text>
                        <Text style={styles.nameText}>{item.last_name}</Text>
                    </View>
                ) : (
                    <UserAvatar size={50} src={item.avatar} name={`${item.first_name} ${item.last_name}`} />
                )}
                <UserAvatar size={50} src={item.avatar} name={`${item.first_name} ${item.last_name}`} />
                {Platform.OS === 'android' && (
                    <View style={styles.textContainer}>
                        <Text style={styles.nameText}>{item.first_name}</Text>
                        <Text style={styles.nameText}>{item.last_name}</Text>
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                refreshing={false}
                onRefresh={onRefresh}
            />
            <TouchableOpacity style={styles.fab} onPress={() => fetchUsers(1)}>
                <Icon name="add" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    textContainer: {
        flex: 1,
        paddingLeft: 10,
    },
    nameText: {
        fontSize: 16,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#2196F3',
        borderRadius: 30,
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
});

export default App;
