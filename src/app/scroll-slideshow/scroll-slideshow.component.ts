import { Component, OnInit, ContentChildren, QueryList, AfterContentInit, ViewChildren, AfterViewInit } from '@angular/core';
import { ScrollSlideshowItemComponent } from '../scroll-slideshow-item/scroll-slideshow-item.component';



@Component({
  selector: 'app-scroll-slideshow',
  templateUrl: './scroll-slideshow.component.html',
  styleUrls: ['./scroll-slideshow.component.css']
})
export class ScrollSlideshowComponent implements OnInit {
 // C:\Users\vijangam\Desktop\angular-projects\slideshow\src\app\scroll-slideshow\images\tek1.png

  slides: any[] = [
    'assets/images/tek6.jpeg',
    'assets/images/tek7.jpg',
    'assets/images/tek8.jpg',
    'assets/images/tek9.jpg'
  ]
  activeSlide=0;
  
  
  
  @ViewChildren(ScrollSlideshowItemComponent) scrollItems: QueryList<ScrollSlideshowItemComponent>;

  constructor() {
    //this.slides = this.slides.reverse();
  }

  ngOnInit() {
    console.log("Slides : ");
    console.log(this.slides);
    setInterval(() => {
      this.onMouseWheelUpFunc(); 
      }, 4000);
  }

  ngAfterViewInit() {
    var self = this;
    setTimeout(function () {
      self.scrollItems.toArray()[self.activeSlide].toggle(1);
    }, 0);
  }

  onMouseWheelUpFunc() {
    console.log("Scrolled up?" + this.activeSlide);
    if (this.activeSlide > 0) {
      this.scrollItems.toArray()[this.activeSlide].toggle(-1);
      if (this.activeSlide >= 1)
        this.scrollItems.toArray()[--this.activeSlide].toggle(-1);
      else
        this.resetToEnd();
    } else {
      this.resetToEnd();
    }
  }

  onMouseWheelDownFunc() {
    console.log("Scrolled down?" + this.activeSlide);
    if (this.activeSlide < (this.slides.length)) {
      this.scrollItems.toArray()[this.activeSlide].toggle(1);
      if (this.activeSlide < this.slides.length - 1)
        this.scrollItems.toArray()[++this.activeSlide].toggle(1);
      else { this.resetToBeginning(); }
    } else {
      this.resetToBeginning();
    }
  }

  resetToEnd() {
    console.log('Reached the beginning !' + this.activeSlide + ":" + this.slides.length);
    this.resetAll();
    this.activeSlide = this.slides.length - 1;
    this.scrollItems.toArray()[this.activeSlide].toggle(-1);
  }
  resetToBeginning() {
    console.log('Reached the end!' + this.activeSlide + ":" + this.slides.length);
    this.resetAll();
    this.activeSlide = 0;
    this.scrollItems.toArray()[this.activeSlide].toggle(1);
  }

  resetAll() {
    this.scrollItems.forEach(item => {
      item.reset();
    });
  }  
  

}
