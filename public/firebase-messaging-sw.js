importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBvrckJaCyN2uqWP6KCDGBha-kIIVIylNs",
  authDomain: "kuikly-7ae93.firebaseapp.com",
  projectId: "kuikly-7ae93",
  storageBucket: "kuikly-7ae93.appspot.com",
  messagingSenderId: "446368829206",
  appId: "1:446368829206:web:274af8c2c955be14d58a37",
  measurementId: "",
};

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
