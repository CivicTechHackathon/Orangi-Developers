import React, { Component } from 'react';
import { FormControl, TextField, Button, InputLabel , Input, InputAdornment } from '@material-ui/core'
import firebase from '../../Config/Firebase'

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      userName: '',
      userEmail: '',
      userPass: '',
      phoneNumber: null,
      amount: '',
      user:{

      }
    }
  this.signUp = this.signUp.bind(this)
  }

  signUp() {
    const { userName, userEmail, userPass, phoneNumber, amount } = this.state
    // console.log(userName, userEmail, userPass, phoneNumber)
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
    .then((succes) => {
      console.log(succes)
      this.setState({ user: succes.user})
      var userObj = {
        userName: userName,
        userEmail: userEmail,
        userPass: userPass,
        phoneNumber: phoneNumber,
        uid: succes.user.uid,
        taxAmount: amount
      }
      firebase.database().ref(`/users/${succes.user.uid}/`).push(userObj)
    })
    .catch((err) => console.log(err))
   
  }

  render() {
    return (
      <div className="App">
        <FormControl>
            <TextField
                id="outlined-full-width1"
                // id="outlined-name"
                label="Full Name"
                required
                fullWidth
                // className={classes.textField}
                // value={this.state.name}
                onChange={(e) => this.setState({ userName: e.target.value})}
                margin="normal"
                variant="outlined"
            />
            <TextField
                required
                id="outlined-full-width2"
                fullWidth
                style={{width:400}}
                type="Number"
                // id="outlined-name"
                label="Phone Number"
                // className={classes.textField}
                // value={this.state.name}
                onChange={(e) => this.setState({ phoneNumber: e.target.value})}
                margin="normal"
                variant="outlined"
            />
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
             <FormControl fullWidth>
                    <InputLabel htmlFor="adornment-amount">Amount</InputLabel>
                    <Input
                        id="adornment-amount"
                        value={this.state.amount}
                        type='Number'
                        onChange={(e) => this.setState({ amount: e.target.value})}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                    
                </FormControl>
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
            <Button onClick={this.signUp}>Sign Up</Button>
        </FormControl>

      </div>
    );
  }
}

export default SignUp;
