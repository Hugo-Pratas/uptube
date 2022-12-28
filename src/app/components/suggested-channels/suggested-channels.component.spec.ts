import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedChannelsComponent } from './suggested-channels.component';

describe('SuggestedChannelsComponent', () => {
  let component: SuggestedChannelsComponent;
  let fixture: ComponentFixture<SuggestedChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestedChannelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestedChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
