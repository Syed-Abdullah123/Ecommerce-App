import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PackageCard from "../components/PackageCard";

const CheckoutScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState();

  const options = [
    {
      title: "Free",
      subtitle: "Free doorstep delivery within 7–14 days",
      price: "$0",
    },
    {
      title: "Fast",
      subtitle: "Get your order in 1–3 days, door step or pickup",
      price: "$9.99",
    },
    {
      title: "Same-day",
      subtitle: "Order beofre 4:00pm and it will be delivered 10:00pm",
      price: "$19.99",
    },
  ];

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <PackageCard
          key={index}
          title={option.title}
          subtitle={option.subtitle}
          price={option.price}
          selected={selectedIndex === index}
          onSelect={() => setSelectedIndex(index)}
        />
      ))}

      {/* Shipping Address Container */}
      <View style={styles.shippingContainer}>
        <Text style={styles.shippingText}>Shipping address</Text>
        <View style={styles.addressContainer}>
          <TextInput
            placeholder="Enter phone number"
            style={styles.input}
            value="+92 310 1234567"
          />
          <TextInput
            placeholder="Enter your address"
            style={styles.input}
            value="123 Main Street"
          />
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TextInput
              placeholder="Enter your country"
              style={[styles.input, { width: "48.5%" }]}
              value="Pakistan"
            />
            <TextInput
              placeholder="Enter your city"
              style={[styles.input, { width: "48.5%" }]}
              value="Lahore"
            />
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TextInput
              placeholder="Enter your state"
              style={[styles.input, { width: "48.5%" }]}
              value="Punjab"
            />
            <TextInput
              placeholder="Enter postal code"
              style={[styles.input, { width: "48.5%" }]}
              value="12345"
            />
          </View>
        </View>
      </View>

      {/* Button container */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Payment", {
            deliveryOption: options[selectedIndex],
            shippingInfo: {
              phone: "+92 310 1234567",
              address: "123 Main Street",
              country: "Pakistan",
              city: "Lahore",
              state: "Punjab",
              postalCode: "12345",
            },
          })
        }
      >
        <Text style={styles.btnText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  shippingContainer: {
    padding: 20,
  },
  shippingText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addressContainer: {
    width: "100%",
    gap: 10,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
  },
  button: {
    position: "absolute",
    bottom: 10,
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
