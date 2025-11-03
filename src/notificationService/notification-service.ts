import { Injectable } from '@angular/core';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { firebaseEnv } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseNotification {
   requestPermission() {
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




