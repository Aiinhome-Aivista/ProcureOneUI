import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseNotification } from '../notificationService/notification-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  constructor(private notify: FirebaseNotification) { }

  ngOnInit() {
    this.notify.requestPermission();
    // this.notify.listenForMessages();
  }
}




// import { Component, OnInit } from '@angular/core';
// import { NotificationService } from './notification.service';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   template: `<h1>🔥 Firebase Push Notifications (Angular 20)</h1>`
// })
// export class App implements OnInit {
//   constructor(private notify: NotificationService) {}

//   ngOnInit() {
//     this.notify.requestPermission();
//     this.notify.listenForMessages();
//   }
// }

