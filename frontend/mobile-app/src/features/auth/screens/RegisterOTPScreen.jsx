import React, { useState } from "react";
import { Alert } from "react-native";
import WhiteButton from "../../../components/common/WhiteButton";
import SpaceDivider from "../../../components/common/SpaceDivider";
import AuthPrimaryContainer from "../components/AuthPrimaryContainer";
import LogoHeader from "../../../components/layout/LogoHeader";
import FormInput from "../../../components/common/FormInput";
import ExplainationText from "../../../components/common/ExplainationText";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth } from "../../../config/firebaseConfig"; // Firebase config

const RegisterOTPScreen = ({ navigation, route }) => {
  const { fullName, phoneNumber, birthDate, password, avatarUri, confirmation } = route.params;
  const [otp, setOtp] = useState("");
  const db = getFirestore(); // Get Firestore instance

  const handleVerifyOTP = async () => {
    try {
      // Xác thực OTP
      await confirmation.confirm(otp);
      Alert.alert("Thành công", "Xác thực thành công!");

      // Lưu thông tin người dùng vào Firestore
      const userRef = doc(db, "users", phoneNumber); // Create or update user document
      await setDoc(userRef, {
        phoneNumber,
        password,  // Lưu mật khẩu (chưa mã hóa)
      });

      // Tiếp tục tới bước đăng ký thông tin cá nhân
      navigation.navigate("RegisterPersonalInfo", {
        fullName,
        phoneNumber,
        birthDate,
        password,
        avatarUri,
      });
    } catch (error) {
      console.error("OTP xác thực lỗi:", error);
      Alert.alert("Lỗi", "Mã OTP không hợp lệ.");
    }
  };

  const handleResendOTP = () => {
    Alert.alert("Thông báo", "Chức năng gửi lại OTP sẽ được cập nhật.");
  };

  return (
    <AuthPrimaryContainer
      logoHeader={<LogoHeader logoSource={require("../../../assets/icons/TeleGO.png")} text="TeleGO" />}
    >
      <ExplainationText text="Nhập mã OTP đã được gửi đến số điện thoại." />

      <FormInput
        label="Mã OTP"
        value={otp}
        onChangeText={setOtp}
        placeholder="Nhập mã OTP"
        keyboardType="numeric"
      />
      <SpaceDivider />
      <WhiteButton title="Xác thực OTP" onPress={handleVerifyOTP} />
      <SpaceDivider />
      <WhiteButton title="Gửi lại OTP" onPress={handleResendOTP} />
    </AuthPrimaryContainer>
  );
};

export default RegisterOTPScreen;
