import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const LoginScreen = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const navigation = useNavigation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleRegister = () => {
    navigation.navigate("Home", { email: email, password: password });
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <ImageBackground
      source={{
        uri: "https://s3-alpha-sig.figma.com/img/f6c9/a386/3060bf968d92368179ce26a756ce4271?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=V3ryBxBx6W2DVY2lz9axZg9isKzpmM7XGM3krujztdNpxfP2lzHIlnse6oHbQ7qmP2RzfYeMYSHJxkbmG77BQr8wRqzD6I21XUKDxD9xcU8TGo5qEbQC4r2vlKg4XJQ6T4f-sN2SurdsHu2jwVpp2TOP6UYXVgXzPkaFx5ZwQ5S8LDo~BNmkkMuW6p~KfnNO~ECLYwzHj3isG1FnkCeiZDaERqFhzxSYnoH9MhDJA7fNu6L1ZGGhOU9odFS78HPt2lT23eBLgDDZiVdH-R7rubNyJH6QGOvjTlRiEuv4N4f9LOUMYXB0EneX32UNg7TvBBm1FtWWHDqULSZ6tvy~rQ__",
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
            <Text style={styles.title}>Увійти</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                placeholderTextColor="#BDBDBD"
                onChangeText={(text) => setEmail(text)}
              />
              <TextInput
                style={[styles.input, styles.lastInput]}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                placeholderTextColor="#BDBDBD"
                onChangeText={(text) => setPassword(text)}
              />
              <Pressable
                style={styles.positionPass}
                onPress={toggleShowPassword}
              >
                <Text style={styles.showPasswordText}>
                  {showPassword ? "Сховати" : "Показати"}
                </Text>
              </Pressable>
            </View>
            {!keyboardVisible && (
              <View>
                <Pressable
                  style={styles.button}
                  title="Увійти"
                  onPress={handleRegister}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </Pressable>
                <View style={styles.textContainer}>
                  <Text style={styles.question}>Немає акаунту?</Text>

                  <Text
                    onPress={() => navigation.navigate("Registration")}
                    style={styles.logIn}
                  >
                    Зареєструватися
                  </Text>
                </View>
              </View>
            )}
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
    flex: 6 / 10,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    backgroundColor: "#F6F6F6",
    height: 40,
    width: "100%",
    height: 50,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginBottom: 16,
  },

  positionPass: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  lastInput: {
    marginBottom: 0,
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: 343,
    height: 51,
    marginBottom: 10,
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
});

export default LoginScreen;
