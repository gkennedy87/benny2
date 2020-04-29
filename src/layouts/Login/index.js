import React, { Component } from 'react';
import { connect } from "react-redux"
import { View, Image, SafeAreaView, Text } from 'react-native';
import { toLower } from "lodash"
import AsyncStorage from "@react-native-community/async-storage"
import { authOperations } from "./../../state/ducks/auth";

import CustomTextfield from '../../components/CustomTextfield';
import { REGEX } from '../../utils/validation';
import { ErrorMessage } from '../../utils/message';
import CustomButton from '../../components/CustomButton';

import styles from './styles';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: true,
      // isModalVisible: false,
      // isToastVisible: false,
      hidePassword: true,
      passVisible: true,
      email: {
        value: '',
        message: [],
        isValid: false,
      },
      password: {
        value: '',
        message: [],
        isValid: false,
      },
    };
  }

  static navigationOptions = {
    header: null,
  };

  onPasswordChange = (text) => {
    const password = this.state.password;
    password.value = text;
    password.message = [];
    password.isValid = true;

    if (password.value.length == 0 || password.value == '') {
      // email.message = ErrorMsg.emailRequired // import
      password.message.push(ErrorMessage.EMPTY_PASS);
      password.isValid = false;
    }

    this.setState({ password });
  };

  onEmailTextChange = (text) => {
    const email = this.state.email;
    email.value = text;
    email.message = [];
    email.isValid = true;

    if (email.value.length == 0 || email.value == '') {
      // email.message = ErrorMsg.emailRequired // import
      email.message.push(ErrorMessage.EMPTY_EMAIL);
      email.isValid = false;
    } else if (!email.value.match(REGEX.EMAIL)) {
      // email.message = ErrorMsg.emailInvalid
      email.message.push(ErrorMessage.EMAIL_VALID);
      email.isValid = false;
    }
    this.setState({ email });
  };

  onPassVisi = () => {
    this.setState({
      passVisible: !this.state.passVisible,
    });
  };

  onLogin = async () => {
    try {
      let { user, tokens } = await this.props.login({
        email: toLower(this.state.email.value),
        password: this.state.password.value
      });
      await AsyncStorage.setItem('isAuthenticated', 'true');
      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('tokens', JSON.stringify(tokens));
      this.props.navigation.navigate('Events');
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  // onChangeValue = () => {
  //   this.setState({
  //     isChecked: !this.state.isChecked,
  //   });
  // };

  render() {
    const { email, password } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.safeareaview}>
        <SafeAreaView style={styles.contentcenter}>
          <View style={styles.container}>
            <View style={styles.logocenter}>
              <Image
                style={styles.logo}
                source={require('../../assets/Images/logo.png')}></Image>
            </View>
            <Text style={styles.logintxt}>Enter your credentials to login</Text>
            <View style={styles.form}>
              <CustomTextfield
                placeholder="Email Id"
                editable={true}
                inputmainstyle={{ marginBottom: 25 }}
                inputstyle={{ paddingRight: 40 }}
                ifIcon={true}
                iconname={'email'}
                onChangeText={this.onEmailTextChange}
                value={email.value}
                errorMsgs={email.message}></CustomTextfield>

              <CustomTextfield
                placeholder="Password"
                inputmainstyle={{ marginBottom: 25 }}
                inputstyle={{ paddingRight: 40 }}
                editable={true}
                passwordField={true}
                passVisible={this.state.passVisible}
                onPassVisi={this.onPassVisi}
                isPassword={true}
                onChangeText={this.onPasswordChange}
                value={password.value}
                errorMsgs={password.message}></CustomTextfield>

              <View style={styles.forgotbtn}>
                <CustomButton
                  btnText="Forgot Password?"
                  btnStyle={styles.forgotbtntxt}
                  value={false}
                  onClick={() => navigate('ForgotPassword')}
                />
              </View>

              <View style={styles.loginbtnmain}>
                <CustomButton
                  btnText="Login"
                  mainStyle={styles.loginyellow}
                  btnStyle={styles.withlogin}
                  // mainStyle={[
                  //   this.state.email.isValid && this.state.password.isValid
                  //     ? styles.loginyellow
                  //     : styles.logingray,
                  //   styles.loginbtn,
                  // ]}
                  // btnStyle={
                  //   this.state.email.isValid && this.state.password.isValid
                  //     ? styles.withlogin
                  //     : styles.withoutlogin
                  // }
                  // value={false}
                  // disabled={
                  //   !(this.state.email.isValid && this.state.password.isValid)
                  // }
                  onClick={this.onLogin}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export const mapStateToProps = (state) => ({});

const mapDispatchToProps = { login: authOperations.login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);