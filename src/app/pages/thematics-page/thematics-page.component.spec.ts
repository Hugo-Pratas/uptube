import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThematicsPageComponent } from './thematics-page.component';

describe('ThematicsPageComponent', () => {
  let component: ThematicsPageComponent;
  let fixture: ComponentFixture<ThematicsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThematicsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThematicsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
