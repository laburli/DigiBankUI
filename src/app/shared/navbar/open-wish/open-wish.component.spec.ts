import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenWishComponent } from './open-wish.component';

describe('OpenWishComponent', () => {
  let component: OpenWishComponent;
  let fixture: ComponentFixture<OpenWishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenWishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenWishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
