import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import * as imagePicker from "expo-image-picker";
import Svg, { Path } from "react-native-svg";
import * as Validate from "../helpers/validationInput";
import { singUp } from "../service/authService";

const RegistrationScreen = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [avatarSource, setAvatarSource] = useState(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const navigation = useNavigation();

  // const checkToken = async () => {
  //   const token = await SecureStore.getItemAsync("token");
  //   console.log("Token from SecureStore:", token);
  //   if (token) {
  //     navigation.navigate("Home");
  //   }
  //   return;
  // };

  const validateForm = () => {
    if (nameError || emailError || passwordError) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  };

  // useEffect(() => {
  //   checkToken();
  // }, []);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const selectImage = async () => {
    let result = await imagePicker.launchImageLibraryAsync({
      mediaTypes: imagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatarSource(result.assets[0].uri);
    }
  };

  const deleteImage = async () => {
    setAvatarSource(null);
  };

  const handleRegister = async () => {
    const newUser = { name, email, password };
    const register = async () => {
      console.log(newUser);
      try {
        const data = await singUp(newUser);
        navigation.navigate("Home");
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    register();
    return;
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleNameChange = (text) => {
    setName(text);
    if (!Validate.validateName(text)) {
      setNameError("Починатися з великої літери і мінімум 3 букви");
    } else {
      setNameError("");
      validateForm();
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (!Validate.validateEmail(text)) {
      setEmailError("Введіть коректну електронну пошту");
    } else {
      setEmailError("");
      validateForm();
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (!Validate.validatePassword(text)) {
      setPasswordError("Пароль повинен містити щонайменше 6 символів");
    } else {
      setPasswordError("");
      validateForm();
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
            <View style={styles.imageContainer}>
              <Image
                source={
                  avatarSource
                    ? { uri: avatarSource }
                    : { uri: "https://via.placeholder.com/120" }
                }
                style={styles.image}
              />
              {!avatarSource ? (
                <Pressable
                  onPress={() => selectImage()}
                  style={styles.addButton}
                >
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill=""
                    stroke="#FF6C00"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <Path d="M12 5v14M5 12h14" />
                  </Svg>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => deleteImage()}
                  style={styles.addButton}
                >
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill=""
                    stroke="#FF6C00"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <Path d="M18 6L6 18M6 6l12 12" />
                  </Svg>
                </Pressable>
              )}
            </View>
            <Text style={styles.title}>Реєстрація</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                // value={name}
                placeholderTextColor="#BDBDBD"
                onChangeText={handleNameChange}
              />
              {renderError(nameError, styles.errorTextName)}
              <TextInput
                style={styles.input}
                placeholder="Email"
                // value={email}
                placeholderTextColor="#BDBDBD"
                onChangeText={handleEmailChange}
              />
              {renderError(emailError, styles.errorTextEmail)}
              <TextInput
                style={[styles.input, styles.lastInput]}
                placeholder="Password"
                secureTextEntry={!showPassword}
                // value={password}
                placeholderTextColor="#BDBDBD"
                onChangeText={handlePasswordChange}
              />
              {renderError(passwordError, styles.errorTextPassword)}
              <Pressable
                style={styles.positionBtn}
                onPress={toggleShowPassword}
              >
                <Text style={styles.positionPass}>
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
                <Text style={styles.buttonText}>Зареєстуватися</Text>
              </Pressable>
              <View style={styles.textContainer}>
                <Text style={styles.question}>Вже є акаунт?</Text>

                <Text
                  onPress={() => navigation.navigate("Login")}
                  style={styles.logIn}
                >
                  Увійти
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
    flex: 2 / 3,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  inputContainer: {
    position: "relative",
    width: "100%",
  },
  input: {
    position: "relative",
    height: 40,
    width: "100%",
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  lastInput: {
    marginBottom: 0,
  },
  errorTextName: {
    position: "absolute",
    top: -20,
    left: 0,
    fontSize: 12,
    color: "red",
  },
  errorTextEmail: {
    position: "absolute",
    top: 38,
    left: 0,
    color: "red",
    fontSize: 12,
  },
  errorTextPassword: {
    color: "red",
    fontSize: 12,
    position: "absolute",
    bottom: 40,
    left: 0,
  },
  positionPass: {
    position: "absolute",
    bottom: 11,
    right: 16,
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: 343,
    height: 51,
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
  imageContainer: {
    position: "absolute",
    top: -70,
    left: "50%",
    transform: [{ translateX: -50 }],
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  addButton: {
    position: "absolute",
    right: -10,
    bottom: 15,
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF6C00",
  },
});

export default RegistrationScreen;
