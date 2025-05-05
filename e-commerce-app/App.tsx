import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Provider } from "react-redux";
import { STRIPE_PUBLISHABLE_KEY } from "./src/config/constants";

import { store } from "./src/store";
import Navigation from "./src/navigation";

export default function App() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <Navigation />
        <StatusBar style="auto" />
      </StripeProvider>
    </Provider>
  );
}
