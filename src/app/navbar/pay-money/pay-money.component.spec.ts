import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayMoneyComponent } from './pay-money.component';

describe('PayMoneyComponent', () => {
  let component: PayMoneyComponent;
  let fixture: ComponentFixture<PayMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
