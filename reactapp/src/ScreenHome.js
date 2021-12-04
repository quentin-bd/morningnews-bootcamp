import React, { useState } from 'react';
import './App.css';
import { Input, Button, Alert } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import {connect} from 'react-redux';

function ScreenHome(props) {

  //States
  const [signUpLogin, setSignUpLogin] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')

  const [signInLogin, setSignInLogin] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const [alertBlankSignUp, setAlertBlankSignUp] = useState('')
  const [alertLoginAndEmail, setAlertLoginAndEmail] = useState('')
  const [alertLogin, setAlertLogin] = useState('')
  const [alertEmail, setAlertEmail] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [alertBlankSignIn, setAlertBlankSignIn] = useState('');
  const [userExists, setUserExists] = useState('');
  let redirect = '';

  //SIGN UP Stuff//
  const handleSubmitSignUp = async () => {
    var rawResponse = await fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `login=${signUpLogin}&email=${signUpEmail}&password=${signUpPassword}`
    });
    var response = await rawResponse.json();
    var token = response.token;
    
    console.log('the response : ', response);

    // ALERTS and Login Set//

    if (response.result === 'login & email exists') {
      setAlertLoginAndEmail(<Alert message="Login and Email already exists! " type="warning" showIcon closable />);
      setAlertEmail('');
      setAlertLogin('');
      setAlertBlankSignUp('');
      redirect = <Redirect to="/"></Redirect>
    }

    if (response.result === 'login exists') {
      setAlertLogin(<Alert message="Login already exists! " type="warning" showIcon closable />);
      setAlertEmail('');
      setAlertLoginAndEmail('');
      setAlertBlankSignUp('');
      redirect = <Redirect to="/"></Redirect>
    }

    if (response.result === 'email exists') {
      setAlertEmail(<Alert message="email already exists! " type="warning" showIcon closable />);
      setAlertLogin('');
      setAlertLoginAndEmail('');
      setAlertBlankSignUp('')
      redirect = <Redirect to="/"></Redirect>
    }
    if (response.result === 'blank input') {
      setAlertBlankSignUp(<Alert message="Empty input! " type="warning" showIcon closable />);
      setAlertLogin('');
      setAlertEmail('');
      setAlertLoginAndEmail('');
      redirect = <Redirect to="/"></Redirect>
    }

    if (response.result === 'ok') {
      setIsLoggedIn(true)
      props.saveUserToken(token)
    }
  }
  console.log(`login :${signUpLogin}, email : ${signUpEmail}, password : ${signUpPassword}`);

  // SIGN IN Stuff//
  const handleSubmitSignIn = async () => {
    var rawResponse = await fetch('/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `login=${signInLogin}&password=${signInPassword}`
    });
    var response = await rawResponse.json();
    let token = response.token;
    
    console.log('the response : ', response);
    if (response.result === 'Yippee Kay Yay') {
      setIsLoggedIn(true);
      props.saveUserToken(token);
    }
    if (response.result === 'blank input') {
      setAlertBlankSignIn(<Alert message="Empty input! " type="warning" showIcon closable />);
      redirect = <Redirect to="/"></Redirect>
    }
    if (response.result === 'Damn') {
      setUserExists(<Alert message="You cannot fool DA KOMPUTER! " type="warning" showIcon closable />)
      redirect = <Redirect to="/"></Redirect>
    }
  }
  console.log(`${signInLogin}, password: ${signInPassword}, trying to log in`)

  if (isLoggedIn === true) {
    redirect = <Redirect to="screen-source"></Redirect>
  }

  return (
    <div className="Login-page" >

      {/* SIGN-IN */}

      <div className="Sign">
        {userExists}
        {alertBlankSignIn}
        <Input className="Login-input" placeholder="Arthur G"
          onChange={(e) => setSignInLogin(e.target.value)}
          value={signInLogin} />

        <Input.Password className="Login-input" placeholder="password"
          onChange={(e) => setSignInPassword(e.target.value)}
          value={signInPassword} />


        <Button style={{ width: '80px' }} type="primary" onClick={() => handleSubmitSignIn()}>Sign-in</Button>
        {redirect}
      </div>

      {/* SIGN-UP */}

      <div className="Sign">

        {alertLoginAndEmail}
        {alertLogin}
        {alertBlankSignUp}
        <Input className="Login-input" placeholder="Arthur G"
          onChange={(e) => setSignUpLogin(e.target.value)}
          value={signUpLogin} />

        {alertEmail}
        <Input className="Login-input" placeholder="wh@ts.up"
          onChange={(e) => setSignUpEmail(e.target.value)}
          value={signUpEmail} />

        <Input.Password className="Login-input" placeholder="password"
          onChange={(e) => setSignUpPassword(e.target.value)}
          value={signUpPassword} />


        <Button style={{ width: '80px' }} type="primary" onClick={() => handleSubmitSignUp()}>Sign-up</Button>
        {redirect}
      </div>

    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    saveUserToken: function (token) {
      dispatch({ type: 'saveUserToken', userToken: token })
    }
  }
}



export default connect(null, mapDispatchToProps)(ScreenHome);
