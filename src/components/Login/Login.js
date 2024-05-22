import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import {
  TextInput,
  View,
  Text,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { logIn } from "../../service/authService";
import { styles } from "./LoginStyles";

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
      await SecureStore.setItemAsync("token", data.token);
      const userString = JSON.stringify(data.user);
      await SecureStore.setItemAsync("user", userString);
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
        style={{ flex: 1 }}
        onPress={Keyboard.dismiss}
        activeOpacity={1}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, justifyContent: "flex-end" }}
        >
          <View style={styles.container}>
            <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 30 }}>
              Увійти
            </Text>
            <View style={{ width: "100%", position: "relative" }}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                placeholderTextColor="#BDBDBD"
                onChangeText={handleEmailChange}
              />
              <TextInput
                style={[styles.input, { marginBottom: 5 }]}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                placeholderTextColor="#BDBDBD"
                onChangeText={handlePasswordChange}
              />
              <Pressable onPress={toggleShowPassword}>
                <Text style={styles.showPasswordText}>
                  {showPassword ? "Сховати" : "Показати"}
                </Text>
              </Pressable>
              <Text
                onPress={() => navigation.navigate("Registration")}
                style={styles.forgotPass}
              >
                Забули пароль
              </Text>
            </View>
            <View>
              <Pressable
                style={[
                  styles.button,
                  styles.buttonActive,
                  !isFormValid && styles.buttonDisabled,
                ]}
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

export default LoginScreen;
