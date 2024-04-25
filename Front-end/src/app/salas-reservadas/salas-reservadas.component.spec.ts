import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalasReservadasComponent } from './salas-reservadas.component';

describe('SalasReservadasComponent', () => {
  let component: SalasReservadasComponent;
  let fixture: ComponentFixture<SalasReservadasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalasReservadasComponent]
    });
    fixture = TestBed.createComponent(SalasReservadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
