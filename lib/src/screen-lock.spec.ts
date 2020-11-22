import {async, TestBed} from '@angular/core/testing';
import {ScreenLockComponent} from './screen-lock.component';
import {Component} from '@angular/core';

describe('screen-lock', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ScreenLockComponent]
      });
    }));

    it('should create mask', () => {
      const fixture = TestBed.createComponent(TestScreenLockComponent);
      expect(fixture.componentInstance).toBeTruthy();
    });
  }
);

@Component({
  template: `
    <screen-lock [lock]="true">
      <p>this area should be locked</p>
    </screen-lock>
  `
})
class TestScreenLockComponent {
}
