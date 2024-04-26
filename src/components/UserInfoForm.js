import React, { useState } from "react";
import IconSetting from "react-native-vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { updateUser } from "../service/authService";

const UserInfoForm = ({ user, getUserInfoStorega }) => {
  const [userInfo, setUserInfo] = useState({
    name: user.name || "",
    email: user.email || "",
  });
  const [isChangeInfo, setIsChangeInfo] = useState(false);

  const updateUserInfo = async () => {
    try {
      const data = await updateUser(userInfo);
      await SecureStore.setItemAsync("user", JSON.stringify(data));
      setIsChangeInfo(false);
      getUserInfoStorega();
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.infoContainer}>
      {isChangeInfo ? (
        <View>
          <TextInput
            style={styles.alignStart}
            placeholder="Ім'я"
            value={userInfo.name}
            onChangeText={(text) =>
              setUserInfo((prevNote) => ({ ...prevNote, name: text }))
            }
          />

          <TextInput
            style={styles.alignStart}
            placeholder="Email"
            value={userInfo.email}
            onChangeText={(text) =>
              setUserInfo((prevNote) => ({ ...prevNote, email: text }))
            }
          />
          <Pressable onPress={updateUserInfo} style={styles.changeInfoBtn}>
            <IconSetting
              name="checkbox-outline"
              size={30}
              color="black"
              style={styles.changeInfoBtn}
            />
          </Pressable>
        </View>
      ) : (
        <View>
          <View style={styles.row}>
            <Text style={[styles.label, styles.alignStart]}>Ім'я:</Text>
            <Text style={styles.value}>{userInfo.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, styles.alignStart]}>email:</Text>
            <Text style={styles.value}>{userInfo.email}</Text>
          </View>
          <Pressable
            onPress={() => setIsChangeInfo(true)}
            style={styles.changeInfoBtn}
          >
            <IconSetting
              name="settings-outline"
              size={30}
              color="black"
              style={styles.changeInfoBtn}
            />
          </Pressable>
        </View>
      )}
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
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontFamily: "Montserrat-Bold",
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
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  btnAvatar: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  btnMargin: {
    marginRight: 30,
  },
});

export default UserInfoForm;
