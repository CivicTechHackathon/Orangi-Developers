import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core'
import StarRatingComponent from 'react-star-rating-component';
import firebase from '../../Config/Firebase'

class SentNotification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projectName:'',
      amountOfFund: '',
      rating: 2,
      location: ''
    }
    // this.onStarClick = this.onStarClick.bind(this)
  }


  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  submit() {
    const {projectName, amountOfFund, rating, location} = this.state
    var postObj = {
      projectName :projectName,
      amountOfFund: amountOfFund,
      rating: rating,
      location : location
    }
    console.log(postObj)
    firebase.database().ref('/Admin/' + projectName).push(postObj)
  }


  render() {
    const {projectName, amountOfFund, rating, location} = this.state
    console.log(projectName, amountOfFund, rating, location)
    return(
      <div>
        <center>
          <h2 style={{color:'#3b5998'}}>Project Information</h2>
          <TextField
          id="standard-name"
          label="Project Name"
          // value={this.state.name}
          onChange={(e) => {this.setState({projectName: e.target.value})}}
          margin="normal"
        /><br/><br/>
         <TextField
          id="standard-name"
          label="Required amount of Fund"
          type = 'Number'
          // value={this.state.name}
          onChange={(e) => {this.setState({amountOfFund: e.target.value})}}
          margin="normal"
        /><br/><br/>
         <TextField
          id="standard-name"
          label="Location"
          // type = 'Location'
          // value={this.state.name}
          onChange={(e) => {this.setState({location: e.target.value})}}
          margin="normal"
        /><br/><br/>
          <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
         // starColor = "#3b5998" 
          /><br/><br/>
          <Button onClick={this.submit.bind(this)}>
            Send
          </Button>
        </center>
      </div>
    )
  }
}

export default SentNotification;