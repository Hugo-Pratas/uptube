import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThematicPageComponent } from './thematic-page.component';

describe('ThematicPageComponent', () => {
  let component: ThematicPageComponent;
  let fixture: ComponentFixture<ThematicPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThematicPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThematicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
