import { StyleSheet, Text, View } from "react-native";
import React from "react";

const PaymentSuccessScreen = () => {
  return (
    <View style={styles.container}>
      <Text>PaymentSuccessScreen</Text>
    </View>
  );
};

export default PaymentSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
});
