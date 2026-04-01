import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRoutes } from './assign-routes';

describe('AssignRoutes', () => {
  let component: AssignRoutes;
  let fixture: ComponentFixture<AssignRoutes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignRoutes],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignRoutes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
