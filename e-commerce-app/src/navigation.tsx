import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProductsScreen from "./screens/ProductsScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ShoppingCart from "./screens/ShoppingCart";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { useSelector } from "react-redux";
import { selectNumberOfItems } from "./store/cartSlice";
import CheckoutScreen from "./screens/CheckoutScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PaymentSuccessScreen from "./screens/PaymentSuccessScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const numberOfItems = useSelector(selectNumberOfItems);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: "#fff" } }}
      >
        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                }}
                onPress={() => {
                  navigation.navigate("Cart");
                }}
              >
                <FontAwesome
                  name="shopping-cart"
                  size={24}
                  color={"#aaa"}
                ></FontAwesome>
                <Text
                  style={{ marginLeft: 5, fontWeight: 500, marginRight: 30 }}
                >
                  {numberOfItems}
                </Text>
              </TouchableOpacity>
            ),
          })}
        ></Stack.Screen>
        <Stack.Screen
          name="Product Details"
          component={ProductDetailsScreen}
          options={{
            animation: "slide_from_bottom",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Cart"
          component={ShoppingCart}
          options={{ animation: "slide_from_right" }}
        ></Stack.Screen>
        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={{ animation: "slide_from_right" }}
        ></Stack.Screen>
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{
            animation: "slide_from_right",
            headerTitle: "",
            headerShadowVisible: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Success"
          component={PaymentSuccessScreen}
          options={{ animation: "slide_from_right" }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
