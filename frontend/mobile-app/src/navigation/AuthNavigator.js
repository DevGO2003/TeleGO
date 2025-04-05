import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthEntryScreen from "../features/auth/screens/AuthEntryScreen";
import LoginScreen from "../features/auth/screens/LoginScreen";
import RegisterPersonalInfoScreen from "../features/auth/screens/RegisterPersonalInfoScreen";
import RegisterOTPScreen from "../features/auth/screens/RegisterOTPScreen";
import RegisterCredentialsScreen from "../features/auth/screens/RegisterCredentialsScreen";
import ForgotPasswordScreen from "../features/auth/screens/ForgotPasswordScreen";
import ForgotPasswordOTPScreen from "../features/auth/screens/ForgotPasswordOTPScreen";
const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AuthEntry"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen name="AuthEntry" component={AuthEntryScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="RegisterCredentials"
        component={RegisterCredentialsScreen}
      />
      <Stack.Screen
        name="RegisterPersonalInfo"
        component={RegisterPersonalInfoScreen}
      />
      <Stack.Screen name="RegisterOTP" component={RegisterOTPScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen
        name="ForgotPasswordOTP"
        component={ForgotPasswordOTPScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
