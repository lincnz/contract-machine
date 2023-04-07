import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngCalendarComponent } from './ang-calendar.component';

describe('AngCalendarComponent', () => {
  let component: AngCalendarComponent;
  let fixture: ComponentFixture<AngCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
