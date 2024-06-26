import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  TextInput,
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
import { CheckBox } from "react-native-btr";
import * as imagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Octicons";
import IconClose from "react-native-vector-icons/AntDesign";
import * as Validate from "../../helpers/validationInput";
import { singUp } from "../../service/authService";
import { createFormDataRegister } from "../../helpers/createFormDataRegister";
import { handleChange } from "../../helpers/handleChangeInput";
import { styles } from "./RegistrationStyles";

const RegistrationScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [avatarSource, setAvatarSource] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    validateForm();
  }, [formData, formErrors]);

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
      ...formData,
      avatarURL: avatarSource,
    };
    try {
      setIsFormValid(false);
      const data = await singUp(createFormDataRegister(newUser));
      await SecureStore.setItemAsync("token", data.token);
      await SecureStore.setItemAsync("user", JSON.stringify(data.user));
      setIsFormValid(true);
      navigation.navigate("Home");
      Alert.alert(
        "",
        "Вітаємо! Ви успішно зареєструвалися! Хочемо вам повідомити, що у нашого додатку широкі офлайн можливості. Користуйтеся із задоволенням. З піклуванням про вас, команда",
        [{ text: "Закрити" }]
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async () => {
    await register();
    return;
  };

  const handleNameChange = handleChange(
    setFormData,
    "name",
    Validate.validateName,
    setFormErrors,
    "nameError",
    "Починатися з великої літери і мінімум 3 букви"
  );

  const handleEmailChange = handleChange(
    setFormData,
    "email",
    Validate.validateEmail,
    setFormErrors,
    "emailError",
    "Введіть коректну електронну пошту"
  );

  const handlePasswordChange = handleChange(
    setFormData,
    "password",
    Validate.validatePassword,
    setFormErrors,
    "passwordError",
    "Пароль повинен містити щонайменше 6 символів"
  );

  const validateForm = () => {
    const isNameValid = formData.name && !formErrors.nameError;
    const isEmailValid = formData.email && !formErrors.emailError;
    const isPasswordValid = formData.password && !formErrors.passwordError;

    setIsFormValid(isNameValid && isEmailValid && isPasswordValid);
  };

  const renderError = (error, errorMessage) => {
    return error ? <Text style={errorMessage}>{error}</Text> : null;
  };

  const toggleCheckBox = () => {
    setIsChecked(!isChecked);
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
              {renderError(formErrors.nameError, [
                styles.errorMessage,
                { top: -20 },
              ])}
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#BDBDBD"
                onChangeText={handleEmailChange}
              />
              {renderError(formErrors.emailError, [
                styles.errorMessage,
                { top: 38 },
              ])}
              <TextInput
                style={[styles.input, { marginBottom: 0 }]}
                placeholder="Password"
                secureTextEntry={!showPassword}
                placeholderTextColor="#BDBDBD"
                onChangeText={handlePasswordChange}
              />
              {renderError(formErrors.passwordError, [
                styles.errorMessage,
                { bottom: 40 },
              ])}
              <Pressable onPress={toggleShowPassword}>
                <Text style={styles.positionPass}>
                  {showPassword ? "Сховати" : "Показати"}
                </Text>
              </Pressable>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  padding: 10,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    marginRight: 5,
                    fontFamily: "Montserrat-Medium",
                    fontSize: 12,
                  }}
                >
                  Погодитися з умовами конфіденційності
                </Text>
                <CheckBox
                  checked={isChecked}
                  onPress={toggleCheckBox}
                  color={"blue"}
                />
              </View>
              <Pressable
                style={[
                  styles.button,
                  (!isFormValid || !isChecked) && styles.buttonDisabled,
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

export default RegistrationScreen;
