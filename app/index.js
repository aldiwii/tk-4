import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { View } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";

export default function App() {
  const [_, setUserInfo] = React.useState(null);
  const router = useRouter();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "217968589857-f3jfb226t2g93ne5vv1p0vembakuvpjh.apps.googleusercontent.com",
    });
  });

  const handleGoogleSignIn = async () => {
    try {
      const res = await GoogleSignin.signIn();

      if (isSuccessResponse(res)) {
        const { idToken, user } = res.data;

        setUserInfo({
          id: idToken,
          ...user,
        });

        router.replace({
          pathname: "/home",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <GoogleSigninButton onPress={handleGoogleSignIn} />
    </View>
  );
}
