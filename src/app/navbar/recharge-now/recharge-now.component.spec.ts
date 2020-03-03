import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeNowComponent } from './recharge-now.component';

describe('RechargeNowComponent', () => {
  let component: RechargeNowComponent;
  let fixture: ComponentFixture<RechargeNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechargeNowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
