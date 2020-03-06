import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollSlideshowComponent } from './scroll-slideshow.component';

describe('ScrollSlideshowComponent', () => {
  let component: ScrollSlideshowComponent;
  let fixture: ComponentFixture<ScrollSlideshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScrollSlideshowComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollSlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
