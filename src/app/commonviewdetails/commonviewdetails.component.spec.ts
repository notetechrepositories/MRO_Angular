import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonviewdetailsComponent } from './commonviewdetails.component';

describe('CommonviewdetailsComponent', () => {
  let component: CommonviewdetailsComponent;
  let fixture: ComponentFixture<CommonviewdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonviewdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonviewdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
