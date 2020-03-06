import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollSlideshowItemComponent } from './scroll-slideshow-item.component';

describe('ScrollSlideshowItemComponent', () => {
  let component: ScrollSlideshowItemComponent;
  let fixture: ComponentFixture<ScrollSlideshowItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScrollSlideshowItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollSlideshowItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
