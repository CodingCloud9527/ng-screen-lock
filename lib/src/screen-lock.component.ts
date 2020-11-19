import {Component, Input} from '@angular/core';

@Component({
  selector: 'screen-lock',
  template: `
    <ng-content *ngIf="lock">
    </ng-content>
  `
})
export class ScreenLockComponent {

  @Input() lock: boolean;
}
