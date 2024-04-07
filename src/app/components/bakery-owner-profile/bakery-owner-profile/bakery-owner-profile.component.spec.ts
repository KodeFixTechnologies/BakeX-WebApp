import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BakeryOwnerProfileComponent } from './bakery-owner-profile.component';

describe('BakeryOwnerProfileComponent', () => {
  let component: BakeryOwnerProfileComponent;
  let fixture: ComponentFixture<BakeryOwnerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BakeryOwnerProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BakeryOwnerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
