import React, { useRef, useState } from "react";
import { Alert } from "react-native";
import AuthPrimaryContainer from "../components/AuthPrimaryContainer";
import LogoHeader from "../../../components/layout/LogoHeader";
import PasswordInputForm from "../components/PasswordInputForm";
import WhiteButton from "../../../components/common/WhiteButton";
import SpaceDivider from "../../../components/common/SpaceDivider";
import ExplainationText from "../../../components/common/ExplainationText";
import { STRINGS } from "../../../constants/strings";
import { PhoneAuthProvider } from "firebase/auth";
import { auth, firestore } from "../../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

const ForgotPasswordScreen = ({ navigation, route }) => {
    const { phoneNumber } = route.params; // Nhận số điện thoại từ LoginScreen
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const recaptchaVerifier = useRef(null); // Dùng cho Firebase OTP

    const handleVerifyPassword = async () => {
        if (!oldPassword || oldPassword.length < 6) {
            return Alert.alert("Lỗi", "Mật khẩu cũ không hợp lệ.");
        }

        if (!newPassword || newPassword.length < 6) {
            return Alert.alert("Lỗi", "Mật khẩu mới phải có ít nhất 6 ký tự.");
        }

        if (newPassword !== confirmPassword) {
            return Alert.alert("Lỗi", "Mật khẩu mới nhập lại không khớp.");
        }

        try {
            const userRef = doc(firestore, "users", phoneNumber);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                return Alert.alert("Lỗi", "Tài khoản không tồn tại.");
            }

            const userData = userSnap.data();

            if (userData.password !== oldPassword) {
                return Alert.alert("Lỗi", "Mật khẩu cũ không đúng.");
            }

            // Bắt đầu quá trình xác thực OTP
            const fullPhoneNumber = `+84${phoneNumber.replace(/^0/, "")}`; // Đảm bảo số điện thoại đúng định dạng quốc tế
            const phoneAuthProvider = new PhoneAuthProvider(auth);

            // Tạo verificationId từ OTP
            const verificationId = await phoneAuthProvider.verifyPhoneNumber(
                fullPhoneNumber, 
                recaptchaVerifier.current
            );

            // Chuyển sang màn hình OTP và truyền `verificationId` và `phoneNumber`
            navigation.navigate("ForgotPasswordOTP", { phoneNumber, newPassword, verificationId });
        } catch (error) {
            console.error("Xác thực mật khẩu thất bại:", error);
            Alert.alert("Lỗi", "Không thể xác thực mật khẩu. Vui lòng thử lại.");
        }
    };

    return (
        <AuthPrimaryContainer
            logoHeader={<LogoHeader logoSource={require("../../../assets/icons/TeleGO.png")} text="TeleGO" />}
        >
            <ExplainationText text="Nhập mật khẩu cũ và mật khẩu mới để tiếp tục." />
            
            {/* Recaptcha modal cần thiết */}
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={auth.app.options} // Cung cấp firebaseConfig ở đây
            />

            <PasswordInputForm
                label="Mật khẩu cũ"
                value={oldPassword}
                onChangeText={setOldPassword}
                placeholder="Nhập mật khẩu cũ"
                secureTextEntry
            />

            <PasswordInputForm
                label="Mật khẩu mới"
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Nhập mật khẩu mới"
                secureTextEntry
            />

            <PasswordInputForm
                label="Nhập lại mật khẩu mới"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Nhập lại mật khẩu mới"
                secureTextEntry
            />

            <SpaceDivider />
            <WhiteButton title="Xác nhận" onPress={handleVerifyPassword} />
        </AuthPrimaryContainer>
    );
};

export default ForgotPasswordScreen;
