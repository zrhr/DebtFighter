import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import AccountForm from '../components/AccountForm';
export default function LinksScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={{alignItems: "center", width: 80+"%"}}>  
      <AccountForm></AccountForm>
      </View>
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Add Account',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
