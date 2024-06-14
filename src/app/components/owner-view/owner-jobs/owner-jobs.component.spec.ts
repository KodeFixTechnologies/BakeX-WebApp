import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerJobsComponent } from './owner-jobs.component';

describe('OwnerJobsComponent', () => {
  let component: OwnerJobsComponent;
  let fixture: ComponentFixture<OwnerJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerJobsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
