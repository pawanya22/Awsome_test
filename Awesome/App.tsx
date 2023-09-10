import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';


export default class App extends React.Component {
  render() {
    return(
    <View style={styles.container}>
        <Text>open up App to start working on your app!</Text>
        <Text>New git hub</Text>
        <Text>I can finish this task</Text>
    </View>
  );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#32a89e',
    alignItems:'center',
    justifyContent:"center"
  }
})

class Lockscreen extends Component {
  constructor (props:any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={"light-content"}/>
        <Text> LocksScreenPasscode </Text>
      </SafeAreaView>
    );
  }

}
