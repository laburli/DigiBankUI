import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, transition, animate, style, state, animation, useAnimation } from '@angular/animations';

export const enterAnimation = animation([
  style({ opacity: 0, transform: 'translateX({{ initEnterTranslate }})' }),
  animate('1000ms ease-in', style({ opacity: 1, transform: 'translateX(0%)' }))
]
);

export const exitAnimation = animation([
  style({ perspective: '100px', }),
  animate('200ms ease-in', style({ perspective: 'none', opacity: 0, transform: 'translateX({{ exitTranslate }})' }))]);

@Component({
  selector: 'scroll-slideshow-item',
  templateUrl: './scroll-slideshow-item.component.html',
  styleUrls: ['./scroll-slideshow-item.component.css'],
  animations: [
    trigger('scrollTrigger', [
      transition(':enter', [useAnimation(enterAnimation, {})]),
      transition(':leave', [useAnimation(enterAnimation, {})])
    ]
    )
  ]
})
export class ScrollSlideshowItemComponent implements OnInit {

  @ViewChild('slideshowitem') slideShowItem: ElementRef;
  show: boolean = false;
  direction: number;

  enterInitPosition: string;
  exitPosition: string;
  constructor() { }

  ngOnInit() {
  }

  toggle(prmDirection: number) {
    this.show = !this.show;
    this.direction = prmDirection;
    this.enterInitPosition = this.direction * 50 + "%";
    this.exitPosition = this.direction * 50 + "%";
  }

  reset() {
    this.show = false;
  }

}
