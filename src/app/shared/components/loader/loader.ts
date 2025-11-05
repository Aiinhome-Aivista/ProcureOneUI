import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {

  lines = Array.from({ length: 12 }, (_, i) => i); // [0..11]

}
