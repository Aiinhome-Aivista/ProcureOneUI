// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBip2Vd0EE4QSqjQ5ZGd6z1xMEepKQ-0S4",
    authDomain: "procureone-7054b.firebaseapp.com",
    projectId: "procureone-7054b",
    storageBucket: "procureone-7054b.firebasestorage.app",
    messagingSenderId: "877165608069",
    appId: "1:877165608069:web:d93cc7be2e84358e10bdec",
    vapidKey: "BPj78_x4lV6JfzOyxdc0cWHtF8h0TAYvo8TwsQy6PFZ3_sUF_1dkAFj1klzZNGaJcOGCShAj5VzDEF-QVnGXvzg"
});

const messaging = firebase.messaging();