import { Component, EventEmitter, Input, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'screen-lock',
  animations: [
    trigger('mask', [
      transition(':enter', [
        style({ transform: 'translateY(-1200px)' }),
        animate('500ms ease-in-out', style({ transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate(
          '500ms ease-in-out',
          style({ transform: 'translateY(-1200px)' })
        ),
      ]),
    ]),
  ],
  template: `
    <ng-template #mask>
      <span class="screen-lock-input-group" [class.shake]="shake">
        <input
          type="password"
          #passwordEle
          (keyup.enter)="validate(passwordEle)"
        />
        <span (click)="validate(passwordEle)" class="screen-lock-unlock-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
            <path
              d="M832 464H332V240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v68c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-68c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zm-40 376H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 1 0-56 0z"
            />
          </svg>
        </span>
      </span>
    </ng-template>
    <div class="screen-lock" [class.screen-lock-full-screen]="fullScreenMode">
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
  shake: boolean;

  @Input() lock: boolean;

  @Output() lockChange = new EventEmitter<boolean>();

  fullScreenMode = false;

  @Input() password: string;

  @Output() unlockSuccess = new EventEmitter<void>();

  @Output() unlockFailed = new EventEmitter<string>();

  validate(inputEle: HTMLInputElement): void {
    if (this.password === inputEle.value) {
      this.unlockSuccess.emit();
      this.lock = false;
      this.lockChange.emit(false);
    } else {
      this.unlockFailed.emit(inputEle.value);
      this.lock = true;
      this.shake = true;
      inputEle.select();
      setTimeout(() => (this.shake = false), 1000);
    }
  }
}
