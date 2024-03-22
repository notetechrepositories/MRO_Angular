import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficedetailsComponent } from './officedetails.component';

describe('OfficedetailsComponent', () => {
  let component: OfficedetailsComponent;
  let fixture: ComponentFixture<OfficedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficedetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
