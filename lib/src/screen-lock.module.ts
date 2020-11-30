import { NgModule } from '@angular/core';
import { ScreenLockService } from './screen-lock.service';
import { ScreenLockComponent } from './screen-lock.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ScreenLockComponent],
  exports: [ScreenLockComponent],
  imports: [CommonModule],
  providers: [ScreenLockService],
})
export class ScreenLockModule {
  lock: boolean;
}
