import React, { Component } from 'react';
import { View, Text, Alert, TouchableOpacity, FlatList } from 'react-native';

const PIN_LENGTH = 4;
const CORRECT_PIN = '1234';
const MAX_ATTEMPTS = 3;

class LockScreenApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredPIN: '',
      remainingAttempts: MAX_ATTEMPTS,
      isLocked: false,
    };
  }

  handleKeyPress = (digit) => {
    if (this.state.isLocked) {
      this.showLockedAlert();
      return;
    }

    const enteredPIN = this.state.enteredPIN + digit;

    if (enteredPIN.length === PIN_LENGTH) {
      if (enteredPIN === CORRECT_PIN) {
        this.showUnlockAlert();
      } else {
        this.handleIncorrectPIN();
      }
    } else {
      this.setState({ enteredPIN });
    }
  };

  handleDeletePress = () => {
    const enteredPIN = this.state.enteredPIN.slice(0, -1);
    this.setState({ enteredPIN });
  };

  handleIncorrectPIN = () => {
    const remainingAttempts = this.state.remainingAttempts - 1;
    this.setState({ remainingAttempts });

    if (remainingAttempts === 0) {
      this.setState({ isLocked: true });
      this.showLockedAlert();
    } else {
      Alert.alert('Incorrect PIN', `You have ${remainingAttempts} attempts left`, [
        { text: 'OK', onPress: () => this.setState({ enteredPIN: '' }) },
      ]);
    }
  };

  showUnlockAlert = () => {
    Alert.alert('Unlocked', 'You have successfully unlocked the app', [
      { text: 'OK', onPress: () => this.resetApp() },
    ]);
  };

  showLockedAlert = () => {
    Alert.alert('Locked', 'The keypad is locked. Please wait for 1 minute.', [
      { text: 'OK', onPress: () => this.resetApp() },
    ]);
  };

  resetApp = () => {
    this.setState({
      enteredPIN: '',
      remainingAttempts: MAX_ATTEMPTS,
      isLocked: false,
    });
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAFAFA' }}>
        <Text style={{ color: '#5A7FD6', fontSize: 24 }}>Enter Passcode</Text>
        <Text style={{ color: '#E15646' }}>
          {this.state.remainingAttempts === MAX_ATTEMPTS
            ? ''
            : `You have ${this.state.remainingAttempts} attempts left`}
        </Text>
        <FlatList
          data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                width: 80,
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                borderRadius: 40,
                backgroundColor: '#5A7FD6',
              }}
              onPress={() => this.handleKeyPress(item)}
            >
              <Text style={{ color: 'white', fontSize: 24 }}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
        <TouchableOpacity
          style={{
            width: 80,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            borderRadius: 40,
            backgroundColor: '#E15646',
          }}
          onPress={this.handleDeletePress}
        >
          <Text style={{ color: 'white', fontSize: 24 }}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LockScreenApp;
