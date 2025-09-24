import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteUpload } from './note-upload';

describe('NoteUpload', () => {
  let component: NoteUpload;
  let fixture: ComponentFixture<NoteUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
