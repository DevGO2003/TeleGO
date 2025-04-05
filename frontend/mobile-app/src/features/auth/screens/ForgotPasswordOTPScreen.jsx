import React, { useState } from "react";
import { Alert } from "react-native";
import AuthPrimaryContainer from "../components/AuthPrimaryContainer";
import LogoHeader from "../../../components/layout/LogoHeader";
import FormInput from "../../../components/common/FormInput";
import WhiteButton from "../../../components/common/WhiteButton";
import SpaceDivider from "../../../components/common/SpaceDivider";
import ExplainationText from "../../../components/common/ExplainationText";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { auth, firestore } from "../../../config/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const ForgotPasswordOTPScreen = ({ navigation, route }) => {
    const { phoneNumber, verificationId, newPassword } = route.params; // Nhận verificationId và newPassword
    const [otp, setOtp] = useState(""); // State để lưu OTP
  
    const handleConfirmOTP = async () => {
        if (!otp || otp.length < 6) {
            return Alert.alert("Lỗi", "Mã OTP không hợp lệ.");
        }
  
        try {
            // Xác thực OTP với Firebase
            const credential = PhoneAuthProvider.credential(verificationId, otp);
            await signInWithCredential(auth, credential);
  
            const userRef = doc(firestore, "users", phoneNumber);
            // Cập nhật mật khẩu người dùng với mật khẩu mới đã được lưu trong ForgotPasswordScreen
            await updateDoc(userRef, {
                password: newPassword,
            });
  
            Alert.alert("Thành công", "Mật khẩu đã được cập nhật!", [
                {
                    text: "Đăng nhập",
                    onPress: () => navigation.navigate("Login"),
                },
            ]);
        } catch (error) {
            console.error("Xác thực OTP thất bại:", error);
            Alert.alert("Lỗi", "Không thể xác thực OTP hoặc cập nhật mật khẩu.");
        }
    };

    return (
        <AuthPrimaryContainer
            logoHeader={<LogoHeader logoSource={require("../../../assets/icons/TeleGO.png")} text="TeleGO" />}
        >
            <ExplainationText text="Nhập mã OTP để hoàn tất việc đặt lại mật khẩu." />
  
            <FormInput
                label="Mã OTP"
                value={otp}
                onChangeText={setOtp}
                placeholder="Nhập mã OTP"
                keyboardType="numeric"
            />
  
            <SpaceDivider />
            <WhiteButton title="Xác nhận OTP" onPress={handleConfirmOTP} />
        </AuthPrimaryContainer>
    );
};

export default ForgotPasswordOTPScreen;
