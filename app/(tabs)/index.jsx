import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import HomeHeader from "@/components/HomePage/HomeHeader";
import ActionOption from "@/components/HomePage/ActionOption";
const Page = () => {
  return (
    <SafeAreaView>
      <View style={{ flex: 1 }}>
        <Stack.Screen
          options={{
            header: () => <HomeHeader />,
          }}
        />
      </View>
      <ActionOption />
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({});
