import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const PackageCard = ({ title, subtitle, price, selected, onSelect }) => {
  return (
    <Pressable
      onPress={onSelect}
      style={[
        styles.container,
        {
          borderColor: selected ? "#000" : "#aaa",
          borderWidth: selected ? 2 : 1,
        },
      ]}
    >
      <View style={styles.check}>
        <MaterialIcons
          name={selected ? "check-box" : "check-box-outline-blank"}
          size={24}
          color="black"
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>{price}</Text>
      </View>
    </Pressable>
  );
};

export default PackageCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginVertical: 10,
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
  },
  check: {
    paddingRight: 10,
    alignSelf: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    flexWrap: "wrap",
  },
  priceContainer: {
    alignItems: "flex-end",
    paddingLeft: 10,
    paddingTop: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
