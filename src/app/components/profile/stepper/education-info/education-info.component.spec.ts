import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationInfoComponent } from './education-info.component';

describe('EducationInfoComponent', () => {
  let component: EducationInfoComponent;
  let fixture: ComponentFixture<EducationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EducationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
