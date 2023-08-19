import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsceneGestureDetectorComponent } from './obscene-gesture-detector.component';

describe('ObsceneGestureDetectorComponent', () => {
  let component: ObsceneGestureDetectorComponent;
  let fixture: ComponentFixture<ObsceneGestureDetectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObsceneGestureDetectorComponent]
    });
    fixture = TestBed.createComponent(ObsceneGestureDetectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
