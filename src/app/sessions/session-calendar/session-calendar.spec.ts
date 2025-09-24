import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCalendar } from './session-calendar';

describe('SessionCalendar', () => {
  let component: SessionCalendar;
  let fixture: ComponentFixture<SessionCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionCalendar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionCalendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
