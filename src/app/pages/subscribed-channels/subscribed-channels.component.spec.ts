import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedChannelsComponent } from './subscribed-channels.component';

describe('SubscribedChannelsComponent', () => {
  let component: SubscribedChannelsComponent;
  let fixture: ComponentFixture<SubscribedChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribedChannelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribedChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
