import React, { useRef, useState } from "react";
import { View, Alert } from "react-native";
import { STRINGS } from "../../../constants/strings";
import SpaceDivider from "../../../components/common/SpaceDivider";
import WhiteButton from "../../../components/common/WhiteButton";
import ExplainationText from "../../../components/common/ExplainationText";
import PasswordInputForm from "../components/PasswordInputForm";
import FormInput from "../../../components/common/FormInput";
import AuthPrimaryContainer from "../components/AuthPrimaryContainer";
import LogoHeader from "../../../components/layout/LogoHeader";

import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { auth } from "../../../config/firebaseConfig"; // bạn đã export auth
import { signInWithPhoneNumber } from "firebase/auth";

const RegisterCredentialsScreen = ({ navigation, route }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);

  const recaptchaVerifier = useRef(null); // dùng cho Firebase OTP

  const handleNext = async () => {
    const trimmedPhone = phoneNumber.trim();
  
    if (!trimmedPhone) {
      return Alert.alert("Lỗi", "Vui lòng nhập số điện thoại.", [{ text: "OK" }]);
    }
  
    if (!/^(0|\+84)[0-9]{9}$/.test(trimmedPhone)) {
      return Alert.alert("Lỗi", "Số điện thoại không hợp lệ.", [{ text: "OK" }]);
    }
  
    if (!password) {
      return Alert.alert("Lỗi", "Vui lòng nhập mật khẩu.", [{ text: "OK" }]);
    }
  
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
      return Alert.alert(
        "Lỗi",
        "Mật khẩu phải có ít nhất 6 ký tự và bao gồm cả chữ và số.",
        [{ text: "OK" }]
      );
    }
  
    if (password !== confirmPassword) {
      return Alert.alert("Lỗi", "Mật khẩu nhập lại không khớp.", [{ text: "OK" }]);
    }
  
    try {
      const fullPhoneNumber = `+84${trimmedPhone.replace(/^0/, "")}`; // đổi 0xxx -> +84xxx
  
      const confirmation = await signInWithPhoneNumber(
        auth,
        fullPhoneNumber,
        recaptchaVerifier.current
      );
  
      navigation.navigate("RegisterOTP", {
        ...route.params,
        phoneNumber: trimmedPhone,
        password,
        confirmation,
      });
    } catch (error) {
      console.error("OTP Error:", error);
      Alert.alert("Lỗi gửi OTP", error.message, [{ text: "OK" }]);
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
      {/* Recaptcha modal cần thiết */}
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
      />

      <FormInput
        label={STRINGS.phoneNumber}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder={STRINGS.phonePlaceholder}
        keyboardType="phone-pad"
      />
      <ExplainationText text={STRINGS.phoneExplanation} />
      <SpaceDivider />

      <PasswordInputForm
        label={STRINGS.password}
        value={password}
        onChangeText={setPassword}
        placeholder={STRINGS.passwordPlaceholder}
        secureTextEntry={hidePass}
      />
      <ExplainationText text={STRINGS.passwordExplanation} />
      <SpaceDivider />

      <PasswordInputForm
        label="Nhập lại mật khẩu"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Nhập lại mật khẩu"
        secureTextEntry={hideConfirmPass}
      />
      <ExplainationText text="Nhập lại mật khẩu để xác nhận." />
      <SpaceDivider />

      <WhiteButton title="Tiếp tục" onPress={handleNext} />
    </AuthPrimaryContainer>
  );
};

export default RegisterCredentialsScreen;