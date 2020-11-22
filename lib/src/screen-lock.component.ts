import { Component, EventEmitter, Input, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'screen-lock',
  animations: [
    trigger('mask', [
      transition(':enter', [
        style({ transform: 'translateY(-1200px)' }),
        animate(300, style({ transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate(300, style({ transform: 'translateY(-1200px)' })),
      ]),
    ]),
  ],
  template: `
    <ng-template #mask>
      <span>
        <input #passwordEle />
        <span (click)="validate(passwordEle.value)">unlock</span>
      </span>
    </ng-template>
    <div class="screen-lock">
      <div class="screen-lock-mask" @mask *ngIf="lock">
        <ng-template [ngTemplateOutlet]="mask"></ng-template>
      </div>

      <div class="screen-lock-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./screen-lock.scss'],
})
export class ScreenLockComponent {
  @Input() lock: boolean;

  @Input() password: string;

  @Output() unlockSuccess = new EventEmitter<void>();

  @Output() unlockFailed = new EventEmitter<string>();

  validate(password: string): void {
    if (this.password === password) {
      this.unlockSuccess.emit();
      this.lock = false;
    } else {
      this.unlockFailed.emit(password);
      this.lock = true;
    }
  }
}
