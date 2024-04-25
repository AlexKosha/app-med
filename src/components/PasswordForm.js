import React, { useState } from "react";
import IconSetting from "react-native-vector-icons/Ionicons";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { updatePassword } from "../service/authService";

const PasswordForm = ({ toggleModal, togglePasswordModal }) => {
  const [userPass, setUserPass] = useState({
    password: "",
    newPassword: "",
  });

  const updateUserPass = async () => {
    try {
      await updatePassword(userPass);
      console.log("пароль обновлено");
      togglePasswordModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.infoContainer}>
      <View>
        <TextInput
          style={styles.alignStart}
          placeholder="Старий пароль"
          value={userPass.password}
          onChangeText={(text) =>
            setUserPass((prevNote) => ({ ...prevNote, password: text }))
          }
        />

        <TextInput
          style={styles.alignStart}
          placeholder="Новий пароль"
          value={userPass.newPassword}
          onChangeText={(text) =>
            setUserPass((prevNote) => ({ ...prevNote, newPassword: text }))
          }
        />

        <Pressable onPress={updateUserPass} style={styles.submitBtn}>
          <IconSetting name="checkbox-outline" size={30} color="black" />
        </Pressable>
        <Pressable onPress={() => toggleModal()} style={styles.closeBtn}>
          <IconSetting name="close" size={30} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

styles = StyleSheet.create({
  infoContainer: {
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  alignStart: {
    minWidth: 80,
  },
  changeInfoBtn: {
    position: "absolute",
    right: 20,
    top: 5,
  },
  submitBtn: {
    position: "absolute",
    right: 20,
    top: -5,
  },
  closeBtn: {
    position: "absolute",
    right: 20,
    top: 25,
  },
});

export default PasswordForm;
