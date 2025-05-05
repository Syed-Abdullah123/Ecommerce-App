import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  useStripe,
  CardField,
  CardFieldInput,
} from "@stripe/stripe-react-native";

import { BACKEND_URL } from "../config/constants";

const PaymentScreen = ({ route, navigation }) => {
  const { deliveryOption, shippingInfo } = route.params;
  const stripe = useStripe();
  const [cardDetails, setCardDetails] = useState<CardFieldInput.Details | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const handlePayPress = async () => {
    // Return if card details are invalid
    if (!cardDetails?.complete) {
      Alert.alert("Error", "Please enter complete card details");
      return;
    }

    setLoading(true);

    try {
      // Use the backend URL from constants
      const backendUrl = `${BACKEND_URL}/create-payment-intent`;

      // Calculate the amount
      const amount = parseFloat(deliveryOption.price.replace("$", ""));
      const amountInCents = Math.round(amount * 100);

      // 1. Create payment intent on the server
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountInCents,
          currency: "usd",
          // You could include metadata about the order here
          metadata: {
            deliveryOption: deliveryOption.title,
            shippingAddress: `${shippingInfo.address}, ${shippingInfo.city}`,
          },
        }),
      });

      const { clientSecret } = await response.json();

      // 2. Confirm the payment with the card details
      const { error, paymentIntent } = await stripe.confirmPayment(
        clientSecret,
        {
          paymentMethodType: "Card",
          // You can customize the billing details here if needed
          paymentMethodParams: {
            billingDetails: {
              name: "Test User", // In a real app, get this from user input
              email: "test@example.com", // In a real app, get this from user input
              address: {
                country: shippingInfo.country,
                city: shippingInfo.city,
                line1: shippingInfo.address,
                postalCode: shippingInfo.postalCode,
                state: shippingInfo.state,
              },
            },
          },
        }
      );

      if (error) {
        Alert.alert("Payment Failed", error.message);
        console.log("Payment error:", error);
      } else if (paymentIntent) {
        Alert.alert(
          "Payment Successful",
          "Your payment was processed successfully!"
        );
        navigation.navigate("PaymentSuccessScreen");
      }
    } catch (e) {
      console.error("Payment error:", e);
      Alert.alert("Payment Error", "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.heading}>Payment Details</Text>

      {/* Order Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>

        {/* Delivery Option */}
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Delivery Option:</Text>
          <Text style={styles.summaryValue}>
            {deliveryOption.title} - {deliveryOption.price}
          </Text>
        </View>
        <Text style={styles.deliveryDescription}>
          {deliveryOption.subtitle}
        </Text>

        {/* Shipping Address */}
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Ship To:</Text>
          <Text style={styles.summaryValue}>{shippingInfo.address}</Text>
        </View>
        <Text style={styles.shippingDetails}>
          {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country}{" "}
          {shippingInfo.postalCode}
        </Text>
        <Text style={styles.shippingDetails}>Phone: {shippingInfo.phone}</Text>
      </View>

      {/* Card Input Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>

        <View style={styles.cardFieldContainer}>
          <CardField
            postalCodeEnabled={true}
            placeholder={{
              number: "4242 4242 4242 4242",
              expiration: "MM/YY",
              cvc: "CVC",
              postalCode: "12345",
            }}
            onCardChange={(cardDetails) => {
              setCardDetails(cardDetails);
            }}
            cardStyle={styles.cardStyle}
            style={styles.cardField}
          />
        </View>

        <Text style={styles.testCardNote}>Use any of these test cards:</Text>
        <Text style={styles.testCardDetails}>
          • 4242 4242 4242 4242 - Successful payment{"\n"}• 4000 0025 0000 3155
          - Requires authentication{"\n"}• 4000 0000 0000 9995 - Declined
          payment
        </Text>
      </View>

      {/* Total */}
      <View style={styles.totalSection}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>{deliveryOption.price}</Text>
      </View>

      {/* Pay Button */}
      <TouchableOpacity
        style={[
          styles.payButton,
          (!cardDetails?.complete || loading) && styles.payButtonDisabled,
        ]}
        onPress={handlePayPress}
        disabled={!cardDetails?.complete || loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.payButtonText}>Pay {deliveryOption.price}</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f8f8f8",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#666",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  deliveryDescription: {
    fontSize: 14,
    color: "#888",
    marginBottom: 12,
  },
  shippingDetails: {
    fontSize: 14,
    color: "#666",
    marginLeft: 0,
    marginBottom: 2,
  },
  cardFieldContainer: {
    marginBottom: 16,
  },
  cardField: {
    width: "100%",
    height: 50,
    marginVertical: 8,
  },
  cardStyle: {
    borderRadius: 8,
    backgroundColor: "#f3f3f3",
    borderColor: "#e0e0e0",
    borderWidth: 1,
    // textColor: '#333333',
  },
  testCardNote: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    marginTop: 8,
  },
  testCardDetails: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
    lineHeight: 18,
  },
  totalSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  totalValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  payButton: {
    backgroundColor: "#2e7d32",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
  },
  payButtonDisabled: {
    backgroundColor: "#a5d6a7",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default PaymentScreen;
