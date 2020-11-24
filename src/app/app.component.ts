import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <screen-lock [(lock)]="lock" [password]="password">
      <div class="app">
        <span>
          set password to lock screen
          <input #inputEle type="text" />
          <button (click)="lockScreen(inputEle.value)">lock</button>
        </span>
      </div>
    </screen-lock>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-screen-lock';

  lock = false;
  password: string;

  lockScreen(password: string): void {
    if (password) {
      this.password = password;
      this.lock = true;
    }
  }
}
