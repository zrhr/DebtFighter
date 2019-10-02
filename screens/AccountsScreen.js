import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import AccountForm from '../components/AccountForm';
export default function AccountsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={{alignItems: "center"}}>  
      <AccountForm></AccountForm>
      </View>
    </ScrollView>
  );
}

AccountsScreen.navigationOptions = {
  title: 'Add Account',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
