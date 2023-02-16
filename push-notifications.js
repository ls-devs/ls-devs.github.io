import firebase from "firebase";
export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyDDf1DY_7OgybdJjUo82AptyltLEZgvpLc",
    authDomain: "pway-b85f9.firebaseapp.com",
    projectId: "pway-b85f9",
    storageBucket: "pway-b85f9.appspot.com",
    messagingSenderId: "168868115150",
    appId: "1:168868115150:web:2ff6ce0791c9d7cfcf569f",
  });
};

export const askForPermissionToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log("Your token is:", token);

    return token;
  } catch (error) {
    console.error(error);
  }
};
