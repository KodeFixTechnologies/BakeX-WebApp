import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerJobCardComponent } from './seeker-job-card.component';

describe('SeekerJobCardComponent', () => {
  let component: SeekerJobCardComponent;
  let fixture: ComponentFixture<SeekerJobCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerJobCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeekerJobCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
