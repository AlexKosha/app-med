import React, { useEffect, useState } from "react";
import * as Validate from "../helpers/validationInput";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { handleChange } from "../helpers/handleChangeInput";
import { forgotPass, restorePassword } from "../service/authService";
import { useNavigation } from "@react-navigation/native";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    otpError: "",
    emailError: "",
    passwordError: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpCode, setIsOtpCode] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    validateForm();
  }, [formData, formErrors]);

  const handleSendOtpCode = async () => {
    try {
      await forgotPass({ email: formData.email });
      setFormData({
        ...formData,
        otp: "",
        password: "",
      });
      setIsOtpCode(true);
      setIsPasswordValid(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePassword = async () => {
    const newPassword = { email: formData.email, password: formData.password };
    try {
      const data = await restorePassword(formData.otp, newPassword);
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackToEmail = () => {
    setFormData({
      ...formData,
      otp: "",
      password: "",
    });
    setIsOtpCode(false);
    setIsPasswordValid(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    console.log(formData);
  };

  const handleOtpChange = handleChange(
    setFormData,
    "otp",
    Validate.validateOtp,
    setFormErrors,
    "otpError",
    "Введіть код який прийшов вам на пошту"
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

  const renderError = (error, errorMessage) => {
    return error ? <Text style={errorMessage}>{error}</Text> : null;
  };

  const validateForm = () => {
    const isEmailValid = formData.email && !formErrors.emailError;
    const isPasswordValid = formData.password && !formErrors.passwordError;
    const isOtpValid = formData.otp && !formErrors.otpError;

    setIsEmailValid(isEmailValid);
    setIsPasswordValid(isOtpValid && isPasswordValid);
  };

  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={Keyboard.dismiss}
      activeOpacity={1}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View style={styles.container}>
          {isOtpCode ? (
            <View style={styles.form}>
              <TextInput
                style={[styles.input, { marginBottom: 16 }]}
                placeholder="Новий пароль"
                secureTextEntry={!showPassword}
                placeholderTextColor="#BDBDBD"
                onChangeText={handlePasswordChange}
              />
              {renderError(formErrors.passwordError, [
                styles.errorMessage,
                { top: -20 },
              ])}
              <TextInput
                style={styles.input}
                placeholder="Код"
                placeholderTextColor="#BDBDBD"
                onChangeText={handleOtpChange}
              />
              {renderError(formErrors.otpError, [
                styles.errorMessage,
                { top: 47 },
              ])}
              <Pressable onPress={toggleShowPassword} style={styles.togglePass}>
                <Text style={styles.togglePassText}>
                  {showPassword ? "Сховати" : "Показати"}
                </Text>
              </Pressable>
              <Pressable
                disabled={!isPasswordValid}
                style={[
                  styles.button,
                  !isPasswordValid && styles.buttonDisabled,
                ]}
                onPress={handleChangePassword}
              >
                <Text style={styles.buttonText}>Змінити пароль</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.backButton]}
                onPress={handleBackToEmail}
              >
                <Text style={styles.buttonText}>Назад</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                value={formData.email}
                placeholder="Email"
                placeholderTextColor="#BDBDBD"
                onChangeText={handleEmailChange}
              />
              {renderError(formErrors.emailError, [
                styles.errorMessage,
                { top: -20 },
              ])}
              <Pressable
                disabled={!isEmailValid}
                style={[styles.button, !isEmailValid && styles.buttonDisabled]}
                onPress={handleSendOtpCode}
              >
                <Text style={styles.buttonText}>Відправити</Text>
              </Pressable>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    // alignItems: "center",
  },
  form: {
    width: "100%",
    // alignItems: "center",
  },
  input: {
    fontFamily: "Montserrat-Regular",
    height: 50,
    width: "100%",
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  errorMessage: {
    fontFamily: "Montserrat-Regular",
    position: "absolute",
    fontSize: 12,
    color: "red",
    left: 0,
  },
  togglePass: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  togglePassText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    color: "#FF6C00",
  },
  button: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 32,
    width: "100%",
    backgroundColor: "#FF6C00",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#CCCCCC",
    pointerEvents: "none",
  },
  buttonText: {
    fontFamily: "Montserrat-Bold",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#FF6C00",
    marginTop: 15,
  },
});

export default ResetPassword;
