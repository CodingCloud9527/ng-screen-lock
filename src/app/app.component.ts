import { Component } from '@angular/core';
import { ScreenLockService } from 'ng-screen-lock';

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <screen-lock [password]="password" [(lock)]="panelLock">
        <nz-card
          nzHoverable
          [nzBodyStyle]="{
            display: 'flex',
            height: '300px',
            alignItems: 'center'
          }"
        >
          <div class="lock-panel">
            <input [(ngModel)]="password" nz-input placeholder="set password" />
            <button
              [disabled]="!password"
              nzType="primary"
              nzSize="small"
              nz-button
              (click)="panelLock = true"
            >
              lock this panel
            </button>
            <button
              [disabled]="!password"
              nzType="primary"
              nzSize="small"
              nz-button
              (click)="screenLock.lock({ password: password })"
            >
              lock whole screen
            </button>
          </div>
        </nz-card>
      </screen-lock>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public screenLock: ScreenLockService) {}

  panelLock = false;

  password: string;
}
