import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useStripe } from "@stripe/stripe-react-native";

const PaymentScreen = ({ route, navigation }) => {
  const { deliveryOption, shippingInfo } = route.params;
  const stripe = useStripe();

  const handlePayPress = async () => {
    const url =
      "http://192.168.10.7:5001/workoutapp-cde1e/us-central1/api/create-payment-intent";
    try {
      const amountInCents = Math.round(
        parseFloat(deliveryOption.price.replace("$", "")) * 100
      );

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountInCents }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const { clientSecret } = await response.json();

      const { error, paymentIntent } = await stripe.confirmPayment(
        clientSecret,
        {
          paymentMethodType: "Card",
        }
      );

      if (error) {
        console.error("Payment failed:", error.message);
        Alert.alert("Payment failed", error.message);
      } else if (paymentIntent) {
        Alert.alert("Payment successful!", `Status: ${paymentIntent.status}`);
        navigation.navigate("PaymentSuccessScreen");
      }
    } catch (err) {
      console.error("Error during payment", err);
      Alert.alert("Error", "Something went wrong during payment.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.heading}>Payment Summary</Text>

      {/* Delivery Option */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Option</Text>
        <Text style={styles.sectionValue}>{deliveryOption.title}</Text>
        <Text style={styles.sectionSubtitle}>{deliveryOption.subtitle}</Text>
        <Text style={styles.sectionPrice}>{deliveryOption.price}</Text>
      </View>

      {/* Shipping Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>
        <Text style={styles.sectionValue}>{shippingInfo.address}</Text>
        <Text style={styles.sectionValue}>
          {shippingInfo.city}, {shippingInfo.state}
        </Text>
        <Text style={styles.sectionValue}>
          {shippingInfo.country}, {shippingInfo.postalCode}
        </Text>
        <Text style={styles.sectionValue}>Phone: {shippingInfo.phone}</Text>
      </View>

      {/* Total */}
      <View style={styles.section}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>{deliveryOption.price}</Text>
      </View>

      {/* Stripe Payment Button */}
      <TouchableOpacity style={styles.button} onPress={handlePayPress}>
        <Text style={styles.btnText}>Pay Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  sectionValue: {
    fontSize: 16,
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },
  sectionPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  // button: {
  //   backgroundColor: "#000",
  //   padding: 15,
  //   borderRadius: 50,
  //   alignItems: "center",
  //   marginTop: 20,
  // },
  // buttonText: {
  //   color: "#fff",
  //   fontSize: 16,
  // },
  button: {
    backgroundColor: "#000",
    width: "95%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 50,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 15,
  },
});
