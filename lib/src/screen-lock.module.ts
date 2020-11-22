import { NgModule } from '@angular/core';
import { ScreenLockService } from './screen-lock.service';
import { ScreenLockComponent } from './screen-lock.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [ScreenLockComponent],
  exports: [ScreenLockComponent],
  imports: [CommonModule, BrowserAnimationsModule],
  providers: [ScreenLockService],
})
export class ScreenLockModule {
  lock: boolean;
}
