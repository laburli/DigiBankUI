import { Directive, Output, HostListener, EventEmitter } from '@angular/core';

@Directive({ selector: '[mouseWheel]' })
export class MouseWheelDirective {
  throttleTime: number = Date.now();
  @Output() mouseWheelUp = new EventEmitter();
  @Output() mouseWheelDown = new EventEmitter();

  @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
    this.throttle(this.mouseWheelFunc, 2000, event)();
    //this.mouseWheelFunc(event);
  }

  @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
    this.throttle(this.mouseWheelFunc, 2000, event)();
    //this.mouseWheelFunc(event);
  }

  @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {
    this.throttle(this.mouseWheelFunc, 2000, event)();
    //this.mouseWheelFunc(event);
  }

  throttle(fn, wait, event): Function {
    console.log('Throttle called !');
    // for IE
    event.returnValue = false;
    // for Chrome and Firefox
    if (event.preventDefault) {
      event.preventDefault();
    }


    //this.throttleTime = Date.now();
    return this.throttleSubFunction.bind(this, fn.bind(this), wait, event);
  }

  throttleSubFunction(fn, wait, event) {
    console.log("fn = " + fn);
    console.log("Time = " + this.throttleTime);
    console.log("Wait = " + wait);
    console.log("Date Now = " + Date.now());
    console.log("Difference = " + (this.throttleTime + wait - Date.now()));
    if ((this.throttleTime + wait - Date.now()) < 0) {
      console.log('Calling now !');
      fn(event);
      this.throttleTime = Date.now();
    }
    else {
      console.log('Not yet !');
    }
  }

  mouseWheelFunc(event: any) {
    console.log("You scrolled for sure :-) ... ");
    var event = window.event || event; // old IE support
    var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    if (delta > 0) {
      this.mouseWheelUp.emit(event);
    } else if (delta < 0) {
      this.mouseWheelDown.emit(event);
    }
    // for IE
    event.returnValue = false;
    // for Chrome and Firefox
    if (event.preventDefault) {
      event.preventDefault();
    }
  }
}