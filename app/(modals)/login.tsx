import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { defaultStyles } from "../../constants/Styles";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import { useAuth, useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}

const Login = () => {
  useWarmUpBrowser();
  const router = useRouter();
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: googleAuth } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];
    try {
      const { createdSessionId, setActive } = await selectedAuth();

      console.log({ createdSessionId, setActive }); //
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (error) {
      console.error("OAuthError:", error);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        placeholderTextColor={Colors.grey}
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TouchableOpacity style={[defaultStyles.btn]}>
        <Text style={[defaultStyles.btnText]}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.separatorView}>
        <View style={styles.separatorLine} />
        <Text style={styles.separator}>or</Text>
        <View style={styles.separatorLine} />
      </View>
      <View style={{ gap: 20 }}>
        <TouchableOpacity style={[defaultStyles.btnOutline]}>
          <Ionicons
            name="call-outline"
            style={[defaultStyles.btnIcon]}
            size={24}
          />
          <Text style={[defaultStyles.btnOutlineText]}>
            Continue with Phone
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[defaultStyles.btnOutline]}
          onPress={() => onSelectAuth(Strategy.Google)}
        >
          <Ionicons
            name="logo-google"
            style={[defaultStyles.btnIcon]}
            size={24}
          />
          <Text style={[defaultStyles.btnOutlineText]}>
            Continue with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[defaultStyles.btnOutline]}
          onPress={() => onSelectAuth(Strategy.Apple)}
        >
          <Ionicons
            name="logo-apple"
            style={[defaultStyles.btnIcon]}
            size={24}
          />
          <Text style={[defaultStyles.btnOutlineText]}>
            Continue with Apple
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[defaultStyles.btnOutline]}
          onPress={() => onSelectAuth(Strategy.Facebook)}
        >
          <Ionicons
            name="logo-facebook"
            style={[defaultStyles.btnIcon]}
            size={24}
          />
          <Text style={[defaultStyles.btnOutlineText]}>
            Continue with Facebook
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  },
  separatorView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 30,
  },
  separator: {
    color: Colors.grey,
  },
  separatorLine: {
    flex: 1,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
