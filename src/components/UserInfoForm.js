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
            style={styles.input}
            placeholder="Ім'я"
            value={userInfo.name}
            onChangeText={(text) =>
              setUserInfo((prevNote) => ({ ...prevNote, name: text }))
            }
          />

          <TextInput
            style={styles.input}
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
  value: {
    fontFamily: "Montserrat-Regular",
  },
  alignStart: {
    minWidth: 80,
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
});

export default UserInfoForm;
