import React from 'react';
import { View, StyleSheet } from 'react-native';
import CommonPrimaryContainer from '../../../components/layout/CommonPrimaryContainer'; // Import CommonPrimaryContainer
import { COLORS } from '../../../constants/colors';

const AuthPrimaryContainer = ({ children, logoHeader }) => {
  return (
    <CommonPrimaryContainer>
      <View style={styles.container}>
        {/* Logo Header chiếm 1/3 trên màn hình */}
        <View style={styles.logoContainer}>
          {logoHeader}  {/* Đặt LogoHeader vào đây */}
        </View>

        {/* Nội dung truyền vào sẽ chiếm 2/3 còn lại của màn hình */}
        <View style={styles.contentContainer}>
          {children}
        </View>
      </View>
    </CommonPrimaryContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  logoContainer: {
    flex: 1, // Chiếm 1/3 màn hình
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 3, // Chiếm 2/3 màn hình
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
});

export default AuthPrimaryContainer;
