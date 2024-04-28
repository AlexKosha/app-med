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
      console.log("пароль обновлено");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.infoContainer}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Старий пароль"
          value={userPass.password}
          onChangeText={(text) =>
            setUserPass((prevNote) => ({ ...prevNote, password: text }))
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Новий пароль"
          value={userPass.newPassword}
          onChangeText={(text) =>
            setUserPass((prevNote) => ({ ...prevNote, newPassword: text }))
          }
        />

        <Pressable onPress={updateUserPass} style={styles.submitBtn}>
          <IconSetting name="checkbox-outline" size={30} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

styles = StyleSheet.create({
  infoContainer: {
    position: "relative",
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  input: {
    position: "relative",
    width: "60%",
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 5,
    paddingHorizontal: 5,
    fontFamily: "Montserrat-Regular",
  },
  changeInfoBtn: {
    position: "absolute",
    right: 20,
    top: 5,
  },
  submitBtn: {
    position: "absolute",
    right: 40,
    top: 15,
  },
});

export default PasswordForm;
