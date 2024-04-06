import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperinceInfoComponent } from './experince-info.component';

describe('ExperinceInfoComponent', () => {
  let component: ExperinceInfoComponent;
  let fixture: ComponentFixture<ExperinceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperinceInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExperinceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
