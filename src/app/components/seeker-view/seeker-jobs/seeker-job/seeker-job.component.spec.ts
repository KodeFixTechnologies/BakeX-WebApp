import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerJobComponent } from './seeker-job.component';

describe('SeekerJobComponent', () => {
  let component: SeekerJobComponent;
  let fixture: ComponentFixture<SeekerJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerJobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeekerJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
