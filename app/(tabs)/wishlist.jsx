import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Wishlist = () => {
  return (
    <View>
      <Link href={"/(modals)/login"}>Login</Link>
      <Link href={"/(modals)/booking"}>Booking</Link>
      <Link href={"/listing/123"}>Listings</Link>
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({});
