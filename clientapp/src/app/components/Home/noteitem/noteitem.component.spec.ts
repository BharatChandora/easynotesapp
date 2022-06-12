import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteitemComponent } from './noteitem.component';

describe('NoteitemComponent', () => {
  let component: NoteitemComponent;
  let fixture: ComponentFixture<NoteitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
