import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import React from "react";

import { NavigationProp } from "@react-navigation/native";

const Login = ({ navigation }: { navigation: NavigationProp<any> }) => {
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
          placeholder="Username, email or mobile number"
          keyboardType="email-address"
        />
      </View>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <View>
        <Text style={styles.fotgotPassword}>Forgot your Password?</Text>
      </View>
      <View style={styles.buttonLogin}>
        <Text style={styles.signIn}>Log in</Text>
      </View>

      <View>
        <Text style={styles.createAcc}>
          Don't have an account?
          <Text
            style={styles.subCreateAcc}
            onPress={() => navigation.navigate("Signup")}
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
    height: 250,
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
  fotgotPassword: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 20,
    fontSize: 16,
  },
  buttonLogin: {
    height: 50,
    backgroundColor: "#0064E0",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    borderRadius: 10,
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
    textDecorationLine: "underline",
  },
  logoMeta: {
    width: 55,
    height: 11,
    alignSelf: "center",
    marginTop: 100,
  },
});
