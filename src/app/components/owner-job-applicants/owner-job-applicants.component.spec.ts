import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerJobApplicantsComponent } from './owner-job-applicants.component';

describe('OwnerJobApplicantsComponent', () => {
  let component: OwnerJobApplicantsComponent;
  let fixture: ComponentFixture<OwnerJobApplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerJobApplicantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerJobApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
