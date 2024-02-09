import { StyleSheet, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import HomeHeader from "@/components/HomePage/HomeHeader";
import ActionOption from "@/components/HomePage/ActionOption";
const Page = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <HomeHeader />,
        }}
      />
      <ActionOption />
    </View>
  );
};

export default Page;
