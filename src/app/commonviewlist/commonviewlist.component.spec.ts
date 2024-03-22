import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonviewlistComponent } from './commonviewlist.component';

describe('CommonviewlistComponent', () => {
  let component: CommonviewlistComponent;
  let fixture: ComponentFixture<CommonviewlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonviewlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonviewlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
