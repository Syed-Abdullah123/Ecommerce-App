import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Navigation from "./src/navigation";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51RKjdpFja6aePhuw7tr9FoJMw1W7eiuVmvQCwr4WLCHaR9GhVTC07WUrKdERoEZVE3tzdvLtETXvJbHgLKTDt79V003LshDDHf">
      <Provider store={store}>
        <Navigation />
        <StatusBar style="auto" />
      </Provider>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
