import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertiseInfoComponent } from './expertise-info.component';

describe('ExpertiseInfoComponent', () => {
  let component: ExpertiseInfoComponent;
  let fixture: ComponentFixture<ExpertiseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertiseInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpertiseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
