import React, { Component } from 'react';
import { FormControl, TextField, Button } from '@material-ui/core'
import firebase from '../../Config/Firebase'

class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      userEmail: '',
      userPass: '',
      user:{

      },
    }
  this.signIn = this.signIn.bind(this)
  }

  signIn() {
    const { userEmail, userPass } = this.state
    // console.log(userName, userEmail, userPass, phoneNumber)
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
    .then((succes) => {
      // console.log(succes)
      this.setState({ user: succes.user})
      this.props.saveUserData(succes.user)
      this.props.renderUserDashboardScreen()
      localStorage.setItem('uid', succes.user.uid)
    })
    .catch((err) => console.log(err))
   
  }



  render() {
    return (
      <div className="App">
      <h1>User Login</h1>
        <FormControl>
            <TextField
                required
                id="outlined-full-width2"
                fullWidth
                style={{width:400}}
                type="email"
                // id="outlined-name"
                label="Email-Adress"
                // className={classes.textField}
                // value={this.state.name}
                onChange={(e) => this.setState({ userEmail: e.target.value})}
                margin="normal"
                variant="outlined"
            />
             <TextField
                required
                id="outlined-full-width3"
                fullWidth
                style={{width:400}}
                type="Password"
                // id="outlined-name"
                label="Password"
                // className={classes.textField}
                // value={this.state.name}
                onChange={(e) => this.setState({ userPass: e.target.value})}
                margin="normal"
                variant="outlined"
            />
            <Button onClick={this.signIn}>Sign In</Button>
        </FormControl>

      </div>
    );
  }
}

export default SignIn;
