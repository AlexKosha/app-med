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
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData, formErrors]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
    const isOtpValid = formData.password && !formErrors.otpError;

    setIsFormValid(isEmailValid && isPasswordValid && isOtpValid);
  };

  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={Keyboard.dismiss}
      activeOpacity={1}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "flex-start" }}
      >
        <View style={{ position: "relative", width: "100%" }}>
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
          {isOtpCode ? (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Код"
                placeholderTextColor="#BDBDBD"
                onChangeText={handleOtpChange}
              />
              {renderError(formErrors.otpError, [
                styles.errorMessage,
                { top: -20 },
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
              <Pressable
                style={styles.button}
                disabled={!isFormValid}
                onPress={() => setIsOtpCode(true)}
              >
                <Text style={styles.buttonText}>Відправити</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              //   disabled={!isFormValid}
              style={styles.button}
              onPress={() => setIsOtpCode(true)}
            >
              <Text style={styles.buttonText}>Відправити</Text>
            </Pressable>
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default ResetPassword;
