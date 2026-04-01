import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackRoutes } from './track-routes';

describe('TrackRoutes', () => {
  let component: TrackRoutes;
  let fixture: ComponentFixture<TrackRoutes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackRoutes],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackRoutes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
