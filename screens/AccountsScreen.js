import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import AccountForm from '../components/AccountForm';
export default function AccountsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
        <View style={styles.titleContainer}><Text style={styles.titleText}>Debt Snowball VS Debt Avalanche</Text></View>
      <AccountForm></AccountForm>
      </View>
    </ScrollView>
    </View>
  );
}

AccountsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  cardNumbers:{
    display: "flex",
    margin: 5,
    justifyContent: "center",
    fontFamily: "monospace",
    fontSize:24,
    color: "rgba(255,255,255,.8)",
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10

  },
  cardText:{
    fontSize: 12,
    fontFamily: "sans-serif",
    color: "black",
    margin: 3,
    marginLeft: 10
  },
    userBar:{
    width: 100 +"%",
    height: 50,
    backgroundColor: "rgb(255,255,255)",
    flexDirection: "row",
    paddingHorizontal:10 ,
    justifyContent:"space-between"

},
userPic:{
    height:40,
    width: 40,
    borderRadius:20
},
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer:{
    width: 100 +"%",
    height: 100,
    marginTop: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgb(250,250,250)",
    borderBottomColor: "rgb(233,233,233)"
},
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    fontSize: 36,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',

    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  creditStyle: {
    backgroundColor: "#3BF",
    opacity: .8,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    flexShrink: 0,
    alignItems: 'center' ,
    flexDirection: 'column',
    width: 80 +"%",
   
  },
  getStartedText: {
   
    
    fontSize: 24,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    
  },
  cardTitle:{
    width:100+"%",
    padding: 10,
    backgroundColor:"#C32",
    margin: 10
  },
  cardTitleText:{
    color: "#FB0",
	fontSize: 24,
	fontWeight: "bold",
  textAlign: 'center'
  },
  debtCaption:{
    color:'#b8b3c3',
    fontSize: 14,
    fontWeight: "normal",
    marginTop: 4
  },

  titleText:{
    fontSize: 24,
    color: "blue",
    textAlign: 'center'
  },
 
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});