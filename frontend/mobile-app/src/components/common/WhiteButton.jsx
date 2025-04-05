import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const WhiteButton = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const LoginOptionButton = ({ title, onPress, style }) => {
  return (
    <WhiteButton
      title={<Text>{title}</Text>} // Wrap title in <Text>
      onPress={onPress}
      style={[styles.button, style]}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 22,
  },
});

export default WhiteButton;
