import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionChipsComponent } from './condition-chips.component';

describe('ConditionChipsComponent', () => {
  let component: ConditionChipsComponent;
  let fixture: ComponentFixture<ConditionChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionChipsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
