import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBvrckJaCyN2uqWP6KCDGBha-kIIVIylNs",
  authDomain: "kuikly-7ae93.firebaseapp.com",
  projectId: "kuikly-7ae93",
  storageBucket: "kuikly-7ae93.appspot.com",
  messagingSenderId: "446368829206",
  appId: "1:446368829206:web:274af8c2c955be14d58a37",
  measurementId: "",
};
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey: "BElZV_dNWJTB2CUkSNZrZtvnv6wY9OEDAvsO7FU5qOu1kaciLFnzRQwi3sSR2TkD-DmINJQgPukDm4UsXA1Mf5E",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.error(err);
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
