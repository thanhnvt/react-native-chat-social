import auth from "@react-native-firebase/auth";
import {
  ConfigureParams,
  GoogleSignin,
} from "@react-native-google-signin/google-signin";
import { API_CLIENT_ID } from "../constant/fireBaseConstant";

export async function onGoogleButtonPress() {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    // Do nothing
  }
  try {
    GoogleSignin.configure({
      webClientId: API_CLIENT_ID,
      // androidClientId:
      //   "1022661262749-3ub280sp5j4pl5r7em3nap4g36cueasj.apps.googleusercontent.com",
      client_type: 3, // Replace with your client ID
    } as ConfigureParams);
    // Check if your device supports Google Play
    const hasPlayServices = await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    if (hasPlayServices) {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();      
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    }
  } catch (error) {
    console.log(JSON.stringify(error));
  }
  return null;
}
