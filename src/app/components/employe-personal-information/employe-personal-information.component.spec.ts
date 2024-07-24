import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployePersonalInformationComponent } from './employe-personal-information.component';

describe('EmployePersonalInformationComponent', () => {
  let component: EmployePersonalInformationComponent;
  let fixture: ComponentFixture<EmployePersonalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployePersonalInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployePersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
