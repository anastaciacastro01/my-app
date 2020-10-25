import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from './assets/logo.png';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files';

class Welcome extends React.Component {
  render() {
    return (
      <Text style = {styles.instructions}>
        Hello, {this.props.name}
      </Text>
    );
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render(){
    return (
      <Text style = {styles.instructions}>It is {this.state.date.toLocaleTimeString()}.</Text>
    );
  }
}

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
    };

    // this binding is necessary to make 'this' work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn,
    }));
  }

  render() {
    return (
      <TouchableOpacity
        onPress = {this.handleClick}
        style = {styles.button}
      >
        <Text style = {styles.buttonText}>{this.state.isToggleOn ? 'ON' : 'OFF'}</Text>
      </TouchableOpacity>
    );
  }
}

function UserGreeting(props) {
  return <Text>Welcome back!</Text>
}

function GuestGreeting(props) {
  return <Text>Please sign up.</Text>
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />
  }
  return <GuestGreeting />
}

function LoginButton(props) {
  return (
    <TouchableOpacity
      onPress = {props.onPress}
      style = {styles.button}
    >
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
  );
}

function LogoutButton(props) {
  return (
    <TouchableOpacity
      onPress = {props.onPress}
      style = {styles.button}
    >
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
  );
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {
      isLoggedIn: false,
    }
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onPress={this.handleLogoutClick} />
    } else {
      button = <LoginButton onPress = {this.handleLoginClick} />
    }

    return (
      <>
        <Greeting isLoggedIn = {isLoggedIn} />
        {button}
        <Text>The user is {isLoggedIn ? 'currently' : 'not'} logged in.</Text>
      </>
    );
  }
}

export default class App extends React.Component {
  handleClick(e) {
    e.preventDefault();
    alert('hi!');
  }

  render() {
    return (
      <View style={styles.container}>
        <Welcome name = "Stacia" />
        <Clock />
        <TouchableOpacity
          onPress = {this.handleClick}
          style = {styles.button}>
          <Text style = {styles.buttonText}>press me!</Text>
        </TouchableOpacity>
        <Toggle />
        <LoginControl />
      </View>
    );
  }
/*
  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if(pickerResult.cancelled === true) {
      return;
    }

    if(Platform.OS === 'web') {
      let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
      setSelectedImage({ localUri: pickerResult.uri, remoteUri });
    } else {
      setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
    }
  };

  let openShareDialogAsync = async () => {
    if(!(await Sharing.isAvailableAsync())) {
      alert("The image is available for sharing at: ${selectedImage.remoteUri}");
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  if(selectedImage !== null) {
    return (
      <View style = {styles.container}>
        <Image
          source = {{ uri: selectedImage.localUri }}
          style = {styles.thumbnail}
        />
        <TouchableOpacity 
          onPress = {openShareDialogAsync}
          style = {styles.button}>
          <Text style = {styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Image source = {{ uri: "https://i.imgur.com/TkIrScD.png" }} style = {styles.logo} />

      <Text style = {styles.instructions}>
        To share a photo from your phone with a friend, just press the button below!
      </Text>

      <TouchableOpacity
        onPress = {openImagePickerAsync}
        style = {styles.button}>
        <Text style = {styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  );
*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
