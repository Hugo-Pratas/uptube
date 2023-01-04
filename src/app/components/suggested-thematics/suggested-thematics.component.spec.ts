import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedThematicsComponent } from './suggested-thematics.component';

describe('SuggestedThematicsComponent', () => {
  let component: SuggestedThematicsComponent;
  let fixture: ComponentFixture<SuggestedThematicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestedThematicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestedThematicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
