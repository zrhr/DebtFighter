import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
        <View style={styles.titleContainer}><Text style={styles.titleText}>Snowball Debt Fight</Text></View>
        <View><Text>`Debt Stacking
The debt stacking method (also known as the debt avalanche method) recommends that you make a list of all your debts, ranked by interest rate, from highest to lowest.

For example, you might owe:

Mastercard, $2,500—19%, highest interest rate
Visa, $7,500—13%, second-highest interest rate
Car loan, $4,000—8%, third-highest interest rate
Student loan, $1,900—5%, lowest interest rate
The debt stacking method advises that you make the minimum payment on all your loans. Then, you should throw all of your extra money toward paying off your Mastercard, which has the highest interest rate, at 19%.

Once you've wiped away your Mastercard debt, tackle the Visa balance, which has the second-highest interest rate, at 13%.

It'll take you a long time to repay the Visa, since it has the highest balance, at $7,500. Stick with it. Whenever you're done, you can start paying off the debts with lower interest rates.

This method saves you the most money in interest payments, but it might take a long time to get a high-balance debt crossed off your list.

You may feel frustrated after investing so much time and energy toward paying down a loan without feeling the mental victory of crossing it off your list.

Debt Snowball
According to the snowball method, you should throw every spare penny toward paying off the loan with the lowest balance, regardless of interest rate.

If you used the snowball method, you would re-order the above list as follows:

Student loan, $1,900—5%, lowest balance
Mastercard, $2,500—19%, second-lowest balance
Car loan, $4,000—8%, third-lowest balance
Visa, $7,500—13%, highest balance
You'd make the minimum payment on all your loans. Then, you'd throw every extra penny toward the debt with the smallest balance, regardless of the fact that, in this particular case, it also has the lowest interest rate.

The idea behind this method is that paying off the loan with the smallest balance will give you the psychological feeling of victory when you cross that loan off your list. That mental win will motivate you to continue saving money and repaying your debts.

This method gives you a more immediate feeling of victory, but it might cost more. Making only minimum payments on your highest-interest debt means you'll pay more in interest, as compared to the debt stacking method.

If you have an iPhone, iPad, or other iOS device, there are apps to help you eliminate your debt more quickly via the debt snowball method..`</Text></View></View>
<View>
<Text>Icons made by freepik and monkik from www.flaticon.com</Text>
</View>
        </ScrollView>
        </View>
  )
}

SettingsScreen.navigationOptions = {
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