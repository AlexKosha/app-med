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
import { logIn } from "../service/authService";

const LoginScreen = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigation = useNavigation();

  const validateForm = () => {
    setIsFormValid(email.trim().length > 0 && password.trim().length > 0);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const login = async () => {
    const dataUser = { email, password };
    try {
      const data = await logIn(dataUser);
      console.log(data);
      navigation.navigate("Home");
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = () => {
    login();
    return;
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleEmailChange = (text) => {
    setEmail(text.trim());
    if (text.trim().length === 0) {
      setIsFormValid(false);
    } else {
      validateForm();
    }
  };

  const handlePasswordChange = (text) => {
    console.log(text);
    setPassword(text.trim());
    if (text.trim().length === 0) {
      setIsFormValid(false);
    } else {
      validateForm();
    }
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
              <TextInput
                style={[styles.input, styles.lastInput]}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                placeholderTextColor="#BDBDBD"
                onChangeText={handlePasswordChange}
              />
              <Pressable
                style={styles.positionPass}
                onPress={toggleShowPassword}
              >
                <Text style={styles.showPasswordText}>
                  {showPassword ? "Сховати" : "Показати"}
                </Text>
              </Pressable>
            </View>
            <View>
              <Pressable
                style={[styles.button, !isFormValid && styles.buttonDisabled]}
                title="Register"
                onPress={handleRegister}
                disabled={!isFormValid}
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
  buttonDisabled: {
    backgroundColor: "#CCCCCC", // Якийсь блідий колір
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: 343,
    height: 51,
    pointerEvents: "none", // Вимикаємо можливість курсора
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
