import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonviewtableComponent } from './commonviewtable.component';

describe('CommonviewtableComponent', () => {
  let component: CommonviewtableComponent;
  let fixture: ComponentFixture<CommonviewtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonviewtableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonviewtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
