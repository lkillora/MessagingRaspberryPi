import React from "react";
import './MyForm.css'

export default class MyForm extends React.Component {
  state = {
    messageText: "",
    passwordText: "",
    submitted: ""
  }
  resState = {
  };

  handleMessageChange = event => {
    {/* messageText equals new value*/}
    this.setState({ messageText: event.target.value });
    this.setState({ submitted: "" });
  };

  handlePasswordChange = event => {
    {/* passwordText equals new value*/}
    this.setState({ passwordText: event.target.value });
    this.setState({ submitted: "" });
  };


  handleSubmit = event => {
    {/* when Submit button clicked, log all the information we have.*/}
    console.log(this.state);
    {/* then submit a post request to the proxy url in the package.json concatenated with "/messages".*/}
    {/* the body of the request will be the state dictionary*/}
    {/* so the body will be a dictionary with keys messageText, passwordText, and submitted*/}
    {/* these will be equal to whatever the message input box text, the password input box text, and 1*/}
    {/* fetch the response of the post request*/}
    const requestOptions = {
      method: 'post',
      headers:{          
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)};
       fetch('/messages', requestOptions)
      .then(response => { return response.json();})
    .then(responseData => {console.log(responseData); return responseData;})
    this.setState({ submitted: "Thank you for submitting your message" });

  };

  render() {
    return (
      <div className="center">
        <div className="settings">
          {/* two text inputs, which update this.state.message and this.state.password respectively*/}
          <label>Message</label>
          <input id="messageinput" placeholder="write your message here" name="Message" value={this.state.message} onChange={this.handleMessageChange} />
          <label>Password</label>
          <input type="password" id="passwordinput" value={this.state.password} onChange={this.handlePasswordChange} />
          <button className="buttonSubmit" onClick={() => this.handleSubmit()}>submit</button>
          <br></br>
          <div> {this.state.submitted} </div>
        </div>
      </div>
    );
  }
}
