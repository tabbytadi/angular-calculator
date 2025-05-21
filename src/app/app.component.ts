import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
  `]
})
export class AppComponent { }
