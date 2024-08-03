import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerBookmarkComponent } from './owner-bookmark.component';

describe('OwnerBookmarkComponent', () => {
  let component: OwnerBookmarkComponent;
  let fixture: ComponentFixture<OwnerBookmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerBookmarkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
