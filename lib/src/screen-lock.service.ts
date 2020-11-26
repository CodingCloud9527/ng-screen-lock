import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Injector,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ScreenLockComponent } from './screen-lock.component';

@Injectable()
export class ScreenLockService {
  private validate$ = new Subject();

  constructor(
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef
  ) {}

  lock(option: LockOption): void {
    const factory = this.resolver.resolveComponentFactory(ScreenLockComponent);

    const viewContainerRef = this.appRef.components[0].injector.get(
      ViewContainerRef
    );
    console.log(viewContainerRef);
    const ref = viewContainerRef.createComponent(factory);
    const { instance } = ref;
    instance.password = option.password;
    instance.lock = true;
    instance.fullScreenMode = true;
    instance.lockChange.subscribe((_) => setTimeout(() => ref.destroy(), 500));
  }
}

export interface LockOption {
  password: string;
}
