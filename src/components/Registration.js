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
  Alert,
} from "react-native";
import * as imagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Octicons";
import IconClose from "react-native-vector-icons/AntDesign";
import * as Validate from "../helpers/validationInput";
import { singUp } from "../service/authService";
import { createFormDataRegister } from "../helpers/createFormDataRegister";
import { CheckBox } from "react-native-btr";

const RegistrationScreen = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [avatarSource, setAvatarSource] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedValid, setIsCheckedValid] = useState(false);
  // const [checkedError, setCheckedError] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    validateForm();
  }, [name, email, password, nameError, emailError, passwordError]);

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
      console.log(result);
      setAvatarSource(result.assets[0]);
    }
  };

  const deleteImage = async () => {
    setAvatarSource(null);
  };

  const register = async () => {
    newUser = {
      name,
      email,
      avatarURL: avatarSource,
      password,
    };
    try {
      setIsFormValid(false);
      const data = await singUp(createFormDataRegister(newUser));
      await SecureStore.setItemAsync("token", data.token);
      const userString = JSON.stringify(data.user);
      await SecureStore.setItemAsync("user", userString);
      setIsFormValid(true);
      navigation.navigate("Home");
      Alert.alert(
        "",
        "Вітаємо! Ви успішно зареєструвалися! Хочемо вам повідомити, що у нашого додатку широкі офлайн можливості. Користуйтеся із задоволенням. З піклуванням про вас, команда",
        [{ text: "Закрити" }]
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async () => {
    register();
    return;
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleNameChange = (text) => {
    const trimmedText = text.trim();
    setName(trimmedText);
    if (!Validate.validateName(trimmedText)) {
      setNameError("Починатися з великої літери і мінімум 3 букви");
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (text) => {
    const trimmedText = text.trim();
    setEmail(trimmedText);
    if (!Validate.validateEmail(trimmedText)) {
      setEmailError("Введіть коректну електронну пошту");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (text) => {
    const trimmedText = text.trim();
    setPassword(trimmedText);
    if (!Validate.validatePassword(trimmedText)) {
      setPasswordError("Пароль повинен містити щонайменше 6 символів");
    } else {
      setPasswordError("");
    }
  };

  const validateForm = () => {
    const isNameValid = name && !nameError;
    const isEmailValid = email && !emailError;
    const isPasswordValid = password && !passwordError;

    setIsFormValid(isNameValid && isEmailValid && isPasswordValid);
  };

  const renderError = (error, errorMessage) => {
    return error ? <Text style={errorMessage}>{error}</Text> : null;
  };

  const toggleCheckBox = () => {
    setIsChecked(!isChecked);
    setIsCheckedValid(!isCheckedValid);
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
        onPress={dismissKeyboard}
        activeOpacity={1}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, justifyContent: "flex-end" }}
        >
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={
                  avatarSource
                    ? { uri: avatarSource.uri }
                    : { uri: "https://via.placeholder.com/120" }
                }
                style={styles.image}
              />
              {!avatarSource ? (
                <Pressable
                  onPress={() => selectImage()}
                  style={styles.addButton}
                >
                  <Icon name="plus" size={24} color="black" />
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => deleteImage()}
                  style={styles.addButton}
                >
                  <IconClose name="close" size={24} color="black" />
                </Pressable>
              )}
            </View>
            <Text style={{ fontSize: 30, fontFamily: "Montserrat-Medium" }}>
              Реєстрація
            </Text>
            <View style={{ position: "relative", width: "100%" }}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#BDBDBD"
                onChangeText={handleNameChange}
              />
              {renderError(nameError, [styles.errorMessage, { top: -20 }])}
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#BDBDBD"
                onChangeText={handleEmailChange}
              />
              {renderError(emailError, [styles.errorMessage, { top: 38 }])}
              <TextInput
                style={[styles.input, { marginBottom: 0 }]}
                placeholder="Password"
                secureTextEntry={!showPassword}
                placeholderTextColor="#BDBDBD"
                onChangeText={handlePasswordChange}
              />
              {renderError(passwordError, [
                styles.errorMessage,
                { bottom: 40 },
              ])}
              <Pressable
                // style={styles.positionBtn}
                onPress={toggleShowPassword}
              >
                <Text style={styles.positionPass}>
                  {showPassword ? "Сховати" : "Показати"}
                </Text>
              </Pressable>
            </View>

            <View>
              <View style={{ flexDirection: "row", padding: 10 }}>
                <Text> Погодитися з умовами конфіденційності</Text>
                <CheckBox
                  checked={isChecked}
                  onPress={toggleCheckBox}
                  color={"blue"}
                />
              </View>
              <Pressable
                style={[
                  styles.button,
                  (!isFormValid || !isCheckedValid) && styles.buttonDisabled,
                ]}
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
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
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
  imageContainer: {
    position: "absolute",
    top: -90,
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
  input: {
    fontFamily: "Montserrat-Regular",
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
  errorMessage: {
    fontFamily: "Montserrat-Regular",
    position: "absolute",
    fontSize: 12,
    color: "red",
    left: 0,
  },
  positionPass: {
    fontFamily: "Montserrat-Regular",
    position: "absolute",
    bottom: 11,
    right: 16,
  },
  button: {
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: 343,
    height: 51,
    backgroundColor: "#FF6C00",
  },
  buttonDisabled: {
    backgroundColor: "#CCCCCC",
    pointerEvents: "none",
  },
  buttonText: {
    fontFamily: "Montserrat-Regular",
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
    fontFamily: "Montserrat-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 16,
  },
  logIn: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
    lineHeight: 16,
  },
});

export default RegistrationScreen;
