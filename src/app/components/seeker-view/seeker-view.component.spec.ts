import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerViewComponent } from './seeker-view.component';

describe('SeekerViewComponent', () => {
  let component: SeekerViewComponent;
  let fixture: ComponentFixture<SeekerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeekerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
