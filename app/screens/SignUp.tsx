import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { authenticationApi } from "../api/authenticationApi";
import {NavigationProp} from "@react-navigation/native";

const SignUp = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [emailExists, setEmailExists] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

<<<<<<< HEAD
  useEffect(() => {

  }, [emailExists]);
=======
  useEffect(() => {}, [emailExists]);
>>>>>>> 3d2048bf778dec555c99be826d555b32a491475a

  const handleRegister = () =>{
    authenticationApi.register({email, password})
        .then(() => navigation.navigate("Verify", {email: email}))
  }

  const checkEmail = async () => {
    try {
      setLoading(true);
      console.log("Checking");
      const data = await authenticationApi.checkEmail(email);
      setEmailExists(data);
      if (data) {
        Alert.alert("Email already exists!");
      } else {
        Alert.alert("Email is valid");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
        <TextInput
          style={styles.textInput}
          placeholder="Username, email or mobile number"
          keyboardType="email-address"
          onChangeText={v => setEmail(v)}
          value={email}
        />
      </View>

      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
          onChangeText={v => setPassword(v)}
          value={password}
        />
      </View>
      <View>
        <TextInput
            style={styles.textInput}
            onChangeText={v => setConfirmPassword(v)}
            value={confirmPassword}
            placeholder="Confirm Password"
          secureTextEntry
        />
      </View>

      <TouchableOpacity onPress={handleRegister} disabled={loading}>
        <View style={styles.buttonLogin}>
          <Text style={styles.signIn}>Sign In</Text>
        </View>
      </TouchableOpacity>

      <View>
        <Text style={styles.subSignin}>Sign in with</Text>
      </View>

      <View style={styles.socialMedia}>
        <Image
          style={styles.iconSocial}
          source={require("../../assets/login-signup/fb-logo.png")}
        />
        <Image
          style={styles.iconSocial}
          source={require("../../assets/login-signup/ins-logo.png")}
        />
      </View>

    </View>
  );
};

export default SignUp;

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
    marginTop: -100,
  },
  textInput: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    borderRadius: 10,
    marginHorizontal: 20,
    elevation: 10,
    fontSize: 16,
    height: 60,
    marginTop: 30,
    paddingLeft: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInputsub: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    borderRadius: 10,
    marginHorizontal: 20,
    elevation: 10,
    fontSize: 16,
    height: 60,
    width: "40%",
    marginTop: 20,
    paddingLeft: 20,
  },
  buttonLogin: {
    height: 50,
    backgroundColor: "#000",
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
  subSignin: {
    fontSize: 17,
    alignSelf: "center",
    marginTop: 50,
  },
  socialMedia: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  iconSocial: {
    marginHorizontal: 5,
    width: 30,
    height: 30,
  },
  logoMeta: {
    width: 55,
    height: 11,
    alignSelf: "center",
    marginTop: 50,
  },
});
