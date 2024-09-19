import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidModalCompComponent } from './bid-modal-comp.component';

describe('BidModalCompComponent', () => {
  let component: BidModalCompComponent;
  let fixture: ComponentFixture<BidModalCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BidModalCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BidModalCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
