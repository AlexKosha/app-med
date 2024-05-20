import React, { useState } from "react";
import IconSetting from "react-native-vector-icons/Ionicons";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { updatePassword } from "../service/authService";

const PasswordForm = () => {
  const [userPass, setUserPass] = useState({
    password: "",
    newPassword: "",
  });

  const updateUserPass = async () => {
    try {
      await updatePassword(userPass);
      setUserPass({ password: "", newPassword: "" });
      console.log("пароль обновлено");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.passInput}
        placeholder="Старий пароль"
        value={userPass.password}
        onChangeText={(text) =>
          setUserPass((prevNote) => ({ ...prevNote, password: text }))
        }
      />

      <TextInput
        style={styles.passInput}
        placeholder="Новий пароль"
        value={userPass.newPassword}
        onChangeText={(text) =>
          setUserPass((prevNote) => ({ ...prevNote, newPassword: text }))
        }
      />

      <Pressable onPress={updateUserPass} style={styles.submitBtn}>
        <IconSetting
          name="checkbox-outline"
          size={30}
          color="black"
          style={styles.submitBtn}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center",
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  passInput: {
    fontFamily: "Montserrat-Regular",
    width: "60%",
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 5,
    padding: 7,
  },
  submitBtn: {
    position: "absolute",
    right: 25,
    top: 22,
  },
});

export default PasswordForm;
