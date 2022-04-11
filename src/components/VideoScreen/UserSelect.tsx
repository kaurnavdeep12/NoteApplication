import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {users} from '../../config';
import {getUserById} from '../../services/CallService';

interface Props {
  opponentsIds: any;
  selectedUsersIds: any[];
  selectUser: (userId: any) => void;
  unselectUser: (userId: any) => void;
}
const UserSelect = ({
  opponentsIds,
  selectedUsersIds,
  selectUser,
  unselectUser,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select users to start Videocall</Text>
      {opponentsIds.map((id: any) => {
        const user = getUserById(id, 'name');
        const selected = selectedUsersIds.some((userId: any) => id === userId);
        
        const type = selected
          ? 'radio-button-checked'
          : 'radio-button-unchecked';
        const onPress = selected ? unselectUser : selectUser;

        return (
          <TouchableOpacity
            key={id}
            style={styles.userLabel}
            onPress={() => onPress(id)}>
            <Text style={styles.userName}>{user}</Text>
            <MaterialIcon name={type} size={20} color="white" />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#1198d4',
    padding: 20,
  },
  userLabel: {
    backgroundColor: '#1198d4',
    width: 150,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
  },

  userName: {color: 'white', fontSize: 20},
});

export default UserSelect;
