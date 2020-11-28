import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { ScreenLockComponent } from './screen-lock.component';
import { AnimationEvent } from '@angular/animations';

@Injectable()
export class ScreenLockService {
  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef
  ) {}

  lock(option: LockOption): void {
    const factory = this.resolver.resolveComponentFactory(ScreenLockComponent);

    const viewContainerRef = this.appRef.components[0].injector.get(
      ViewContainerRef
    );
    const componentRef = viewContainerRef.createComponent(factory);
    const { instance } = componentRef;
    instance.password = option.password;
    instance.lock = true;
    instance.fullScreenMode = true;

    const destroySafely = (event: AnimationEvent) => {
      if (
        event.phaseName === 'done' &&
        event.fromState === null &&
        event.toState === 'void'
      ) {
        componentRef.destroy();
      }
    };

    instance.maskAnimateCallbacks.push(destroySafely);

    if (option.onSuccess) {
      instance.onSuccess.subscribe(() => option.onSuccess());
    }

    if (option.onFailed) {
      instance.onFailed.subscribe(p => option.onFailed(p));
    }
  }
}

export interface LockOption {
  password: string;
  onSuccess?: () => void;
  onFailed?: (invalidPassword: string) => void;
}
