import React from 'react';
import { StyleSheet } from 'react-native';
import AuthPrimaryContainer from '../../auth/components/AuthPrimaryContainer'; // Sử dụng AuthPrimaryContainer mới
import WhiteButton from '../../../components/common/WhiteButton';
import { STRINGS } from '../../../constants/strings';
import LogoHeader from '../../../components/layout/LogoHeader'; // Sử dụng lại LogoHeader

const AuthEntryScreen = ({ navigation }) => {
  return (
    <AuthPrimaryContainer
      logoHeader={<LogoHeader logoSource={require('../../../assets/icons/TeleGO.png')} text={STRINGS.welcome} />}
    >
      <WhiteButton
        title={STRINGS.login}
        onPress={() => navigation.navigate('Login')}
      />
      <WhiteButton
        title={STRINGS.register}
        onPress={() => navigation.navigate('RegisterCredentials')}
      />
    </AuthPrimaryContainer>
  );
};

export default AuthEntryScreen;

const styles = StyleSheet.create({});
