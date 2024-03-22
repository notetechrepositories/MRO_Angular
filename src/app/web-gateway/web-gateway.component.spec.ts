import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebGatewayComponent } from './web-gateway.component';

describe('WebGatewayComponent', () => {
  let component: WebGatewayComponent;
  let fixture: ComponentFixture<WebGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebGatewayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
