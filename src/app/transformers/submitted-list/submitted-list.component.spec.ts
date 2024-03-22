import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedListComponent } from './submitted-list.component';

describe('SubmittedListComponent', () => {
  let component: SubmittedListComponent;
  let fixture: ComponentFixture<SubmittedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmittedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmittedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
