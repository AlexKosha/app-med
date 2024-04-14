import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import * as Validate from "../helpers/validationInput";

const LoginScreen = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigation = useNavigation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleRegister = () => {
    navigation.navigate("Home", { email: email, password: password });
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (!Validate.validateEmail(text)) {
      setEmailError("Введіть коректну електронну пошту");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (!Validate.validatePassword(text)) {
      setPasswordError("Пароль повинен містити щонайменше 6 символів");
    } else {
      setPasswordError("");
    }
  };

  const renderError = (error, errorMessage) => {
    return error ? <Text style={errorMessage}>{error}</Text> : null;
  };
  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/free-photo/cute-pastel-purple-marble-background_53876-104400.jpg?size=626&ext=jpg&ga=GA1.1.1695762122.1711480779&semt=ais",
      }}
      style={styles.backgroundImage}
    >
      <TouchableOpacity
        style={styles.TouchableOpacity}
        onPress={dismissKeyboard}
        activeOpacity={1}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inner}
        >
          <View style={styles.container}>
            <Text style={styles.title}>Увійти</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                placeholderTextColor="#BDBDBD"
                onChangeText={handleEmailChange}
              />
              {renderError(emailError, styles.errorTextEmail)}
              <TextInput
                style={[styles.input, styles.lastInput]}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                placeholderTextColor="#BDBDBD"
                onChangeText={handlePasswordChange}
              />
              {renderError(passwordError, styles.errorTextPassword)}
              <Pressable
                style={styles.positionPass}
                onPress={toggleShowPassword}
              >
                <Text style={styles.showPasswordText}>
                  {showPassword ? "Сховати" : "Показати"}
                </Text>
              </Pressable>
            </View>
            {!keyboardVisible && (
              <View>
                <Pressable
                  style={styles.button}
                  title="Увійти"
                  onPress={handleRegister}
                >
                  <Text style={styles.buttonText}>Увійти</Text>
                </Pressable>
                <View style={styles.textContainer}>
                  <Text style={styles.question}>Немає акаунту?</Text>

                  <Text
                    onPress={() => navigation.navigate("Registration")}
                    style={styles.logIn}
                  >
                    Зареєструватися
                  </Text>
                </View>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  TouchableOpacity: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  inner: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 30,
  },
  container: {
    position: "relative",
    flex: 6 / 10,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  inputContainer: {
    width: "100%",
    position: "relative",
  },
  input: {
    backgroundColor: "#F6F6F6",
    height: 40,
    width: "100%",
    height: 50,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  lastInput: {
    marginBottom: 0,
  },
  errorTextEmail: {
    position: "absolute",
    top: -18,
    left: 0,
    color: "red",
    fontSize: 12,
  },
  errorTextPassword: {
    color: "red",
    fontSize: 12,
    position: "absolute",
    top: 50,
    left: 0,
  },
  positionPass: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: 343,
    height: 51,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  question: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 16,
  },
  logIn: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
    lineHeight: 16,
  },
});

export default LoginScreen;
