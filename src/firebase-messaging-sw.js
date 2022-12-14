import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import { getMessaging, onBackgroundMessage, isSupported } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-messaging-sw.js";

const firebaseApp = initializeApp({
    projectId: 'instaclo-d1953',
    appId: '1:380399534978:web:93c710c0f5418fe088459b',
    databaseURL: 'https://instaclo-d1953-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'instaclo-d1953.appspot.com',
    apiKey: 'AIzaSyCwURI47R8CabcS_EJnavmZXhTbp5HSzXE',
    authDomain: 'instaclo-d1953.firebaseapp.com',
    messagingSenderId: '380399534978',
});

const messaging = getMessaging(firebaseApp);
isSupported()
    .then((isSupported) => {
        if (isSupported) {
            onBackgroundMessage(messaging, ({ notification: { title, body, image } }) => {
                self.registration.showNotification(title, {
                    body,
                    icon: image || "/assets/icons/icon-72x72.png",
                });
            });
        }
    })
    .catch((error) => {
        console.log(error);
    });
