import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationProp } from "@react-navigation/native";
import { authenticationApi } from "../api/authenticationApi";
import { Key } from "../constants/Key";
import { useAppDispatch } from "../store";
import { useAuthAction } from "../features/auth";
import { ApiError, ErrorCode } from "../models/Error";
import Toast from "react-native-toast-message";

const Login = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { authenticate } = useAuthAction();

  function validateEmail() {
    if (!email) setError({ ...error, email: "Email must not be blank" });
  }

  function validatePassword() {
    if (!password)
      setError({ ...error, password: "Password must not be blank" });
  }

  function handleError(e: ApiError) {
    console.log(e);
    switch (e.code) {
      case ErrorCode.ACCOUNT_DISABLED:
        navigation.navigate("Verify", {
          email: email,
        });
        Toast.show({
          type: "info",
          text2: "Account is not verify",
        });
        break;
      default:
        Toast.show({ type: "error", text2: e.message });
    }
  }

  const isValid = () => {
    return Object.values(error).every((value) => !value);
  };

  function handleLogin() {
    if (!password || !email) return;
    if (isValid())
      authenticationApi
        .login({ email, password, twoFactorCode: "" })
        .then((data) => {
          dispatch(authenticate(data.accessToken));
          return AsyncStorage.setItem(Key.REFRESH_TOKEN, data.refreshToken);
        })
        .then(() => {
          Toast.show({
            type: "success",
            text2: "This is some something 👋",
          });
        })
        .catch((e: ApiError) => handleError(e));
  }

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../../assets/login-signup/background.png")}
          style={styles.topImg}
        />
      </View>
      <View>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
      </View>
      <View>
        <Text style={styles.subLogin}>Sign in to your Account</Text>
      </View>
      <View>
        <TextInput
          style={styles.textInput}
          onBlur={() => validateEmail()}
          onFocus={() => setError({ ...error, email: "" })}
          placeholder="Username, email or mobile number"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <Text>{error["email"]}</Text>
      </View>
      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setPassword(text)}
          onFocus={(e) => setError({ ...error, password: "" })}
          value={password}
          onBlur={validatePassword}
          placeholder="Password"
          secureTextEntry
        />
        <Text>{error?.password}</Text>
      </View>
      <View>
        <Text style={styles.forgotPassword}>Forgot your Password?</Text>
      </View>
      <TouchableOpacity onPress={() => handleLogin()} disabled={loading}>
        <View style={styles.buttonLogin}>
          <Text style={styles.signIn}>Log in</Text>
        </View>
      </TouchableOpacity>

      <View>
        <Text style={styles.createAcc}>
          Don't have an account?
          <Text
            style={styles.subCreateAcc}
            onPress={() => navigation.navigate("REGISTER")}
          >
            Create
          </Text>
        </Text>
      </View>

      <View>
        <Image
          source={require("../../assets/logo-meta.png")}
          style={styles.logoMeta}
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "",
  },
  topImg: {
    width: "100%",
    height: 150,
  },
  logo: {
    width: 50,
    height: 50,
    alignSelf: "center",
  },
  subLogin: {
    marginTop: 50,
    alignSelf: "center",
    fontSize: 16,
  },
  textInput: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    borderRadius: 10,
    marginHorizontal: 20,
    elevation: 10,
    fontSize: 16,
    height: 60,
    marginTop: 20,
    paddingLeft: 20,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 20,
    fontSize: 16,
  },
  buttonLogin: {
    height: 50,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    fontSize: 18,
  },
  signIn: {
    color: "#ffffff",
    fontSize: 18,
  },
  createAcc: {
    alignSelf: "center",
    marginTop: 60,
    fontSize: 16,
  },
  subCreateAcc: {
    paddingLeft: 4,
    textDecorationLine: "underline",
  },
  logoMeta: {
    width: 55,
    height: 11,
    alignSelf: "center",
    marginTop: 100,
  },
});
