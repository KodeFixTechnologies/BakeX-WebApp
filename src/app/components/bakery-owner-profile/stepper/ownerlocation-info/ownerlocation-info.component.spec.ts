import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerlocationInfoComponent } from './ownerlocation-info.component';

describe('OwnerlocationInfoComponent', () => {
  let component: OwnerlocationInfoComponent;
  let fixture: ComponentFixture<OwnerlocationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerlocationInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerlocationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
