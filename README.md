[![GitHub license](https://img.shields.io/github/license/CodingCloud9527/ng-screen-lock)](https://github.com/CodingCloud9527/ng-screen-lock/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/ng-screen-lock/latest)](https://www.npmjs.org/package/ng-screen-lock)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/CodingCloud9527/ng-screen-lock/ci)  
`ng-screen-lock` is a beautiful component based on angular 2+,provide lock screen ui like `windows` or `MacOS`,you can check this [demo](https://codingcloud9527.github.io/ng-screen-lock/) to preview.

## Installation

```shell script
yarn add ng-scrren-lock
```

or

```shell script
npm install ng-screen-lock
```

## Usage

You should import `ScreenLockModule` into your application like this:

```js
imports: [
  ScreenLockModule,
  // other modules you want import...
];
```

we provide two modes of lock screen:

1. For panel mode, you can use [ScreenLockComponent](https://github.com/CodingCloud9527/ng-screen-lock/blob/master/lib/src/screen-lock.component.ts) directly like this:

```js
@Component({
  template: `
    <screen-lock [password]="'123456'" [(lock)]="lock">
      <p>The scrren will be locked if the lock property become true</p>
    </screen-lock>
  `,
})
class TestScreenLockComponent {
  lock = false;
}
```

2. For full screen mode, you can inject [ScreenLockService](https://github.com/CodingCloud9527/ng-screen-lock/blob/master/lib/src/screen-lock.service.ts) like this:

```js
@Component({
  template: `
    <button  (click)="lockScreen()">
       <p>click to lock with full screen mode</p>
    </button>
`,
})
class TestScreenLockServiceComponent {
  constructor(private screenLock: ScreenLockService) {}

  lockScreen(){
    this.screenLock.lock({ password: '123456' };
  }
}
```
