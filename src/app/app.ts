import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { LoaderService } from './core/services';
import { Loader } from './shared/components/loader/loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, Loader],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly loaderService = inject(LoaderService);
}
