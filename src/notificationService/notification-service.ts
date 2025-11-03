import { Injectable } from '@angular/core';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { firebaseEnv } from '../environments/environment';
import { initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class FirebaseNotification {

   private appInitialized = false;

  private initFirebase() {
    if (!this.appInitialized) {
      initializeApp(firebaseEnv.firebase);
      this.appInitialized = true;
      console.log('Firebase initialized manually');
    }
  }
   requestPermission() {
    this.initFirebase();
    const messaging = getMessaging();
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        getToken(messaging, { vapidKey: firebaseEnv.firebase.vapidKey })
          .then(token => {
            console.log(' FCM Token:', token);
          })
          .catch(err => console.error('Error getting token:', err));
      } else {
        console.warn(' Notification permission not granted.');
      }
    });
  }

  // listenForMessages() {
  //   const messaging = getMessaging();
  //   onMessage(messaging, payload => {
  //     console.log(' Message received:', payload);
  //     alert(`${payload.notification?.title}\n${payload.notification?.body}`);
  //   });
  // }
}




