import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  animate,
  AnimationEvent,
  style,
  transition,
  trigger,
} from '@angular/animations';

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
      <span
        class="screen-lock-input-group"
        [class.screen-lock-invalid-password]="invalid"
      >
        <input
          type="password"
          (change)="invalid = false"
          #passwordEle
          (keyup.enter)="validate(passwordEle)"
        />
        <i (click)="validate(passwordEle)" class="screen-lock-unlock-icon"> </i>
      </span>
    </ng-template>
    <div class="screen-lock" [class.screen-lock-full-screen]="fullScreenMode">
      <div
        class="screen-lock-mask"
        @mask
        (@mask.start)="onMaskAnimate($event)"
        (@mask.done)="onMaskAnimate($event)"
        *ngIf="lock"
      >
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
  invalid: boolean;

  fullScreenMode = false;

  maskAnimateCallbacks: ((event: AnimationEvent) => void)[] = [];

  @Input() lock: boolean;

  @Output() lockChange = new EventEmitter<boolean>();

  @Input() password: string;

  @Output() onSuccess = new EventEmitter<void>();

  @Output() onFailed = new EventEmitter<string>();

  constructor(private cdr: ChangeDetectorRef) {}

  validate(inputEle: HTMLInputElement): void {
    this.invalid = false;
    this.cdr.detectChanges();
    if (this.password === inputEle.value) {
      this.onSuccess.emit();
      this.lock = false;
      this.lockChange.emit(false);
    } else {
      this.onFailed.emit(inputEle.value);
      this.lock = true;
      this.invalid = true;
      inputEle.select();
    }
  }

  onMaskAnimate(event: AnimationEvent): void {
    this.maskAnimateCallbacks.forEach(c => c(event));
  }
}
