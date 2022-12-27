import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTopRightComponent } from './menu-top-right.component';

describe('MenuTopRightComponent', () => {
  let component: MenuTopRightComponent;
  let fixture: ComponentFixture<MenuTopRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuTopRightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuTopRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
