import React, { Component } from 'react';
import './App.css';
import AppBar from './Components/Constants/AppBar';
import SignUp from './Screens/SignUp';
import SignIn from './Screens/SignIn';
import AdminLogin from './Screens/AdminLogin';
import AdminDashboard from './Screens/AdminDashboard'
import UserDashboard from './Screens/UserDashboard';
import firebase from './Config/Firebase';
// import SentNotification from './Screens/SentNotification'

class App extends Component {
  constructor() {
    super()
    this.state = {
      signUpScreen: false,
      signInScreen: false,
      adminLoginScreen: false,
      currentUser: null,
      adminDashboardScreen: false,
      userDashboardScreen: false
    }
    this.renderSignUpScreen = this.renderSignUpScreen.bind(this)
    this.renderSignInScreen = this.renderSignInScreen.bind(this)
    this.renderAdminLoginScreen = this.renderAdminLoginScreen.bind(this)
    this.renderAdminDashboardScreen = this.renderAdminDashboardScreen.bind(this)
    this.renderHome = this.renderHome.bind(this)
    this.renderUserDashboardScreen = this.renderUserDashboardScreen.bind(this)
    this.saveUserData = this.saveUserData.bind(this)


  }

  componentWillMount() {
    var uid = localStorage.getItem('uid')
    firebase.database().ref(`/users/${uid}/`).on('child_added', (snapShot) => {
      var currentUser = snapShot.val()
      this.setState({ currentUser })

    })
  }

  renderSignUpScreen() {
    this.setState({ signUpScreen: true, signInScreen: false, adminLoginScreen: false })
  }

  renderSignInScreen() {
    this.setState({ signInScreen: true, signUpScreen: false, adminLoginScreen: false })
  }

  renderHome() {
    this.setState({ signInScreen: false, signUpScreen: false, adminLoginScreen: false, adminDashboardScreen: false, currentUser: null })
  }

  renderAdminDashboardScreen(currentUser) {
    this.setState({ signInScreen: false, signUpScreen: false, adminLoginScreen: false, adminDashboardScreen: true, currentUser })
  }

  renderUserDashboardScreen() {
    this.setState({ signInScreen: false, signUpScreen: false, adminLoginScreen: false, adminDashboardScreen: false, userDashboardScreen: true  })
  }

  renderAdminLoginScreen() {
    this.setState({ signInScreen: false, signUpScreen: false, adminLoginScreen: true })
  }

  back() {
    this.setState({ signInScreen: false, signUpScreen: false })
  }

  saveUserData(user) {
    console.log(user)
    let currentUser = {
      userName: user.email
    }
    this.setState({ currentUser })
  }

  render() {
    const { signUpScreen, signInScreen, adminLoginScreen, adminDashboardScreen, currentUser, userDashboardScreen } = this.state
    console.log(currentUser)
    return (
      <div className="App">
        <header className="App-header">
          <AppBar signUpScreen={this.renderSignUpScreen} signInScreen={this.renderSignInScreen} adminLoginScreen={this.renderAdminLoginScreen} currentUser={currentUser} homeScreen={this.renderHome} />
        </header>
        {signUpScreen && !signInScreen && !adminLoginScreen && <SignUp back={this.back}/>}
        {!signUpScreen && signInScreen && !adminLoginScreen && <SignIn renderUserDashboardScreen={this.renderUserDashboardScreen} saveUserData={this.saveUserData} back={this.back} />}
        {!signUpScreen && !signInScreen && adminLoginScreen && <AdminLogin renderAdminDashboardScreen={this.renderAdminDashboardScreen} back={this.back} />}
        {!signUpScreen && !signInScreen && !adminLoginScreen && adminDashboardScreen && <AdminDashboard back={this.back} />}
        {!signUpScreen && !signInScreen && !adminLoginScreen && !adminDashboardScreen && userDashboardScreen && currentUser && <UserDashboard back={this.back} />}
      </div>
    );
  }
}

export default App;
