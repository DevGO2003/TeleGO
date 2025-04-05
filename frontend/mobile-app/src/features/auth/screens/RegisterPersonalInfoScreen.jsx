// src/screens/RegisterPersonalInfoScreen.js

import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadImageToCloudinary } from "../utils/uploadImageToCloudinary"; // Import hàm upload ảnh
import { STRINGS } from "../../../constants/strings";
import FormInput from "../../../components/common/FormInput";
import ExplainationText from "../../../components/common/ExplainationText";
import SpaceDivider from "../../../components/common/SpaceDivider";
import WhiteButton from "../../../components/common/WhiteButton";
import AuthPrimaryContainer from "../components/AuthPrimaryContainer";
import LogoHeader from "../../../components/layout/LogoHeader";
import { firestore } from "../../../config/firebaseConfig"; // Đường dẫn đến firebaseConfig.js
import { doc, setDoc } from "firebase/firestore"; // thay vì addDoc

const RegisterPersonalInfoScreen = ({ navigation, route }) => {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [avatar, setAvatar] = useState(require("../../../assets/images/default.png"));
  const [avatarUri, setAvatarUri] = useState(null);
  const [fullNameError, setFullNameError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");

  const handlePickAvatar = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Quyền bị từ chối", "Ứng dụng cần quyền truy cập thư viện.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarUri(null);
  };

  const validateInputs = () => {
    let isValid = true;
    setFullNameError("");
    setBirthDateError("");

    if (!fullName.trim()) {
      setFullNameError("Vui lòng nhập họ và tên.");
      isValid = false;
    }

    if (!birthDate.trim()) {
      setBirthDateError("Vui lòng nhập ngày sinh.");
      isValid = false;
    } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(birthDate)) {
      setBirthDateError("Ngày sinh không đúng định dạng (DD/MM/YYYY).");
      isValid = false;
    }

    return isValid;
  };

  const handleNext = async () => {
    if (!validateInputs()) return;
  
    try {
      let imageUrl = null;
      if (avatarUri) {
        imageUrl = await uploadImageToCloudinary(avatarUri);
      }
  
      // 🔄 Cập nhật document với phoneNumber làm ID
      const userRef = doc(firestore, "users", route.params.phoneNumber);
      await setDoc(userRef, {
        fullName,
        birthDate,
        avatar: imageUrl,
        createdAt: new Date(),
      }, { merge: true }); // merge để giữ lại password, phoneNumber
  
      Alert.alert("Thành công", "Tạo tài khoản thành công. Vui lòng đăng nhập lại.", [
        {
          text: "OK",
          onPress: () => {
            setFullName("");
            setBirthDate("");
            setAvatarUri(null);
            navigation.navigate("Login", {
              ...route.params,
              fullName,
              birthDate,
              avatarUri: imageUrl,
            });
          },
        },
      ]);
    } catch (error) {
      console.error("Firestore or Cloudinary error:", error);
      Alert.alert("Lỗi", "Không thể tạo tài khoản. Vui lòng thử lại.");
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
      {/* Họ và tên */}
      <FormInput
        label={STRINGS.fullName}
        value={fullName}
        onChangeText={setFullName}
        placeholder={STRINGS.fullNamePlaceholder}
        errorMessage={fullNameError}
      />
      <ExplainationText text={STRINGS.fullNameExplanation} />
      <SpaceDivider />

      {/* Ngày sinh */}
      <FormInput
        label="Ngày sinh"
        value={birthDate}
        onChangeText={setBirthDate}
        placeholder="DD/MM/YYYY"
        errorMessage={birthDateError}
      />
      <ExplainationText text="Ngày sinh giúp xác minh danh tính của bạn." />
      <SpaceDivider />

      {/* Ảnh đại diện */}
      <Text style={{ fontWeight: "bold", marginTop: 20, marginBottom: 8 }}>
        Ảnh đại diện
      </Text>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
        }}
      >
        <Image
          source={avatarUri ? { uri: avatarUri } : avatar}
          style={{
            width: 100,
            height: 100,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#ccc",
          }}
        />
        <View style={{ flexDirection: "row", marginTop: 8 }}>
          <TouchableOpacity onPress={handlePickAvatar} style={{ marginRight: 16 }}>
            <Text style={{ color: "#007AFF" }}>Chọn hình</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRemoveAvatar}>
            <Text style={{ color: "red" }}>Xoá hình</Text>
          </TouchableOpacity>
        </View>
      </View>
      <SpaceDivider />

      <WhiteButton title="Tiếp tục" onPress={handleNext} />
    </AuthPrimaryContainer>
  );
};

export default RegisterPersonalInfoScreen;