import {
  ComponentFixtureAutoDetect,
  fakeAsync,
  TestBed,
} from '@angular/core/testing';
import { ApplicationRef, Component } from '@angular/core';
import { ScreenLockModule } from './screen-lock.module';
import { ScreenLockService } from './screen-lock.service';

it('should component work', fakeAsync(() => {
  TestBed.configureTestingModule({
    imports: [ScreenLockModule],
    declarations: [TestScreenLockComponent],
    providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
  }).compileComponents();

  const fixture = TestBed.createComponent(TestScreenLockComponent);
  const componentInstance = fixture.componentInstance;
  const componentEle = fixture.debugElement.nativeElement;

  expect(componentEle.querySelector('.screen-lock-mask')).toBeNull();
  componentInstance.lock = true;
  fixture.detectChanges();
  expect(componentEle.querySelector('.screen-lock-mask')).not.toBeNull();
  const inputEle = componentEle.querySelector(
    '.screen-lock-input-group > input'
  );
  inputEle.value = '123456';
  inputEle.dispatchEvent(new Event('input'));

  componentEle.querySelector('.screen-lock-unlock-icon').click();
  expect(
    componentEle.querySelector('.screen-lock-mask:not(.ng-animating)')
  ).toBeNull();
}));

it('should service work', fakeAsync(() => {
  TestBed.configureTestingModule({
    imports: [ScreenLockModule],
    declarations: [TestScreenLockServiceComponent],
    providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
  }).compileComponents();

  const fixture = TestBed.createComponent(TestScreenLockServiceComponent);

  const componentInstance = fixture.componentInstance;
  (TestBed.get(ApplicationRef) as ApplicationRef).components.push(
    fixture.componentRef
  );
  expect(document.querySelector('screen-lock')).toBeNull();

  const onSuccess = jasmine.createSpy();

  const onFailed = jasmine.createSpy();

  componentInstance.screenLock.lock({
    password: 'qwerty',
    onFailed,
    onSuccess,
  });
  fixture.detectChanges();

  expect(
    document.querySelector('screen-lock>.screen-lock.screen-lock-full-screen')
  ).not.toBeNull();

  const inputEle = document.body.querySelector(
    '.screen-lock-input-group > input'
  );
  (inputEle as HTMLInputElement).value = '123456';
  inputEle.dispatchEvent(new Event('input'));
  document
    .querySelector('.screen-lock-unlock-icon')
    .dispatchEvent(new Event('click'));
  expect(document.querySelector('screen-lock')).not.toBeNull();
  expect(onFailed).toHaveBeenCalled();

  (inputEle as HTMLInputElement).value = 'qwerty';
  inputEle.dispatchEvent(new Event('input'));
  document
    .querySelector('.screen-lock-unlock-icon')
    .dispatchEvent(new Event('click'));

  expect(onSuccess).toHaveBeenCalled();

  expect(
    document.querySelector('.screen-lock-mask:not(.ng-animating)')
  ).toBeNull();
}));

@Component({
  template: `
    <screen-lock [password]="'123456'" [(lock)]="lock">
      <p>this area should be locked</p>
    </screen-lock>
  `,
})
class TestScreenLockComponent {
  lock = false;
}

@Component({
  template: ` <div></div>`,
})
class TestScreenLockServiceComponent {
  constructor(public screenLock: ScreenLockService) {}
}
