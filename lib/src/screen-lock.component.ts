import {Component, Input} from '@angular/core';

@Component({
  selector: 'screen-lock',
  template: `

    <div class="screen-lock">
      <div class="screen-lock-mask" *ngIf="lock"></div>

      <div class="screen-lock-content">
        <ng-content>
        </ng-content>
      </div>
    </div>


  `,
  styleUrls: ['./screen-lock.scss']
})
export class ScreenLockComponent {

  @Input() lock: boolean;
}
