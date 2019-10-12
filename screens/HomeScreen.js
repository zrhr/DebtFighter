import * as WebBrowser from 'expo-web-browser';
import React ,{useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';
import { submitPayment }from '../store/accounts/actions'
import {connect} from 'react-redux'
import { MonoText } from '../components/StyledText';



 const HomeScreen=(props)=> {
  const[debtPaymentField, setdebtPaymentField]=useState("")
  var name;

 const changeText=(inputText)=> {
    const formattedText =  inputText;
    setdebtPaymentField(formattedText);
  }
  const endEditing=()=> {
   
    
    props.onAccount(debtPaymentField)
    
  }
  const totalDebt=5;
  const totalMonths=19;
  const totalInterest=10000;
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
        <View style={styles.titleContainer}><Text style={styles.titleText}>Snowball Debt Fight</Text></View>
        <View style={styles.userBar}>
           <View style={{flexDirection:"row", alignItems: "center"}}>
        <Image
        style={styles.userPic} 
        source={require('../assets/images/Snowball-ico1.png')}></Image>
           <Text style={{marginLeft:10}}>Total Debt: $ {totalDebt}</Text>
           </View>
           <View style={{flexDirection:"row", alignItems: "center"}}>
             <Text>{totalMonths} Months till Debt Free </Text>
            </View>
            <View style={{flexDirection:"row", alignItems: "center"}}>
            <Text>Total Interest Paid: $ {totalInterest}</Text>
            </View>
           
           </View>
        </View>
        <View style={{flexDirection:"row",alignItems:"center"}}>
        <TextInput style={{marginLeft: 50, fontSize:24}} placeholder="Amount Here" value={props.account.debtPayment}
  onChangeText={text => changeText(text)}
  onEndEditing={() =>endEditing()}
  ></TextInput>
        <Text style={styles.getStartedText}>Debt Payment Each Month</Text>


  </View>
<View style={{alignItems: "center"}}>      
  {props.account.accounts.map(account=>{return(
        <View  key={account.id} style={styles.creditStyle}>
        <View style={styles.cardTitle} ><Text style={styles.cardTitleText}>Name: {account.name}</Text></View>
        
        
        <View style={{display:"flex"}}>
          <Text style={styles.cardNumbers}>BALANCE $ {account.balance} </Text></View>
          <View style={{flexDirection:'row', justifyContent: "flex-end"}}>
            <Text style={styles.cardText}> Months Left </Text>
            <Text style={styles.cardNumbers}>{account.months }</Text>
            <Text style={styles.cardText}>APR</Text>
            <Text style={styles.cardNumbers}>{account.apr}</Text>         
          </View>
          <View style={{flexDirection:'row', justifyContent: "flex-end"}}>
            <Text style={styles.cardText}>Min Payment </Text>
            <Text style={styles.cardNumbers}>{account.minimumPayment }</Text>
            <Text style={styles.cardText}>New Payment</Text>
            <Text style={styles.cardNumbers}>{account.calcPayment}</Text>         
          </View>
         </View>
         )})}
  </View>
        <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>
              Help, it didn’t automatically reload!
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>
          This is a tab bar. You can edit it in:
        </Text>

      
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

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
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
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
const mapStateToProps = (state) => {
return({  account: state.accounts})
}
const mapDispatchToProps = dispatch => {
  return {
    onAccount: payment => {
      dispatch(submitPayment(payment))
    }
  }
}
export default connect (mapStateToProps, mapDispatchToProps)(HomeScreen)