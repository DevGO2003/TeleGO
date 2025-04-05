import React, { useState } from "react";
import { Text, StyleSheet, View, Alert } from "react-native";
import AuthPrimaryContainer from "../components/AuthPrimaryContainer"; // Sử dụng AuthPrimaryContainer
import { STRINGS } from "../../../constants/strings"; // Sử dụng strings từ constants
import LogoHeader from "../../../components/layout/LogoHeader"; // Sử dụng LogoHeader
import LoginOptionButton from "../components/LoginOptionButton"; // Import LoginOptionButton
import FormInput from "../../../components/common/FormInput"; // Import FormInput
import WhiteButton from "../../../components/common/WhiteButton"; // Import WhiteButton
import SpaceDivider from "../../../components/common/SpaceDivider";
import { commonStyles } from "../../../styles/commonStyles";
import ExplainationText from "../../../components/common/ExplainationText";
import PasswordInputForm from "../components/PasswordInputForm";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "../../../config/firebaseConfig";

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!phone || phone.trim() === "") {
      return Alert.alert("Thiếu thông tin", "Vui lòng nhập số điện thoại.");
    }

    if (!/^[0-9]{9,11}$/.test(phone)) {
      return Alert.alert("Số điện thoại không hợp lệ", "Vui lòng nhập đúng định dạng.");
    }

    if (!password || password.length < 6) {
      return Alert.alert("Mật khẩu không hợp lệ", "Mật khẩu phải có ít nhất 6 ký tự.");
    }

    try {
      const userRef = doc(firestore, "users", phone);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        return Alert.alert("Lỗi", "Tài khoản không tồn tại.");
      }

      const userData = userSnap.data();

      if (userData.password !== password) {
        return Alert.alert("Lỗi", "Mật khẩu không đúng.");
      }

      Alert.alert("Đăng nhập thành công", `Chào mừng ${userData.fullName || "bạn"} trở lại!`, [
        {
          text: "OK",
          onPress: () => {
            console.log("User logged in:", userData);
            // TODO: Điều hướng đến trang chính hoặc lưu thông tin người dùng
          },
        },
      ]);
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  const handleRegister = () => {
    navigation.navigate("RegisterCredentials");
  };

  const handleForgotPassword = async () => {
    if (!phone || phone.trim() === "") {
      return Alert.alert("Thiếu thông tin", "Vui lòng nhập số điện thoại.");
    }
  
    if (!/^[0-9]{9,11}$/.test(phone)) {
      return Alert.alert("Số điện thoại không hợp lệ", "Vui lòng nhập đúng định dạng.");
    }
  
    try {
      const userRef = doc(firestore, "users", phone);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists()) {
        // Chuyển số điện thoại qua ForgotPasswordScreen
        navigation.navigate("ForgotPassword", { phoneNumber: phone });
      } else {
        Alert.alert("Lỗi", "Số điện thoại này không được đăng ký.");
      }
    } catch (error) {
      console.error("Forgot Password Validation Error:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi kiểm tra số điện thoại. Vui lòng thử lại.");
    }
  };
  

  return (
    <AuthPrimaryContainer
      logoHeader={
        <LogoHeader
          logoSource={require("../../../assets/icons/TeleGO.png")}
          text="TeleGO"
        />
      }
    >
      {/* Text explaining the QR and phone options
      <ExplainationText text={STRINGS.selectLoginMethod} />

      <View style={commonStyles.flex_spacebetween_fullwidth}>
        <LoginOptionButton
          title={STRINGS.qrLogin}
          onPress={() => {}}
        />
        <LoginOptionButton
          title={STRINGS.phoneLogin}
          onPress={() => {}}
        />
      </View>*/}

      {/* Divider Line */}
      <SpaceDivider />

      <FormInput
        label={STRINGS.phoneNumber}
        value={phone}
        onChangeText={setPhone}
        placeholder={STRINGS.phonePlaceholder}
      />

      <PasswordInputForm
        label={STRINGS.password}
        value={password}
        onChangeText={setPassword}
        placeholder={STRINGS.passwordPlaceholder}
        secureTextEntry
      />

      <WhiteButton title={STRINGS.login} onPress={handleLogin} />

      {/* Divider Line */}
      <SpaceDivider />

      <ExplainationText text={STRINGS.forgotPasswordText} />

      {/* White Button for Forgot Password */}
      <WhiteButton title={STRINGS.forgotPassword} onPress={handleForgotPassword} />

      <ExplainationText text={STRINGS.registerText} />

      {/* White Button for Register */}
      <WhiteButton title={STRINGS.register} onPress={handleRegister} />
    </AuthPrimaryContainer>
  );
};

export default LoginScreen;