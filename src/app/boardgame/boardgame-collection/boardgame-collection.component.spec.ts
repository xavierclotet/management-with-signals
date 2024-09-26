import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardgameCollectionComponent } from './boardgame-collection.component';

describe('BoardgameCollectionComponent', () => {
  let component: BoardgameCollectionComponent;
  let fixture: ComponentFixture<BoardgameCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardgameCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardgameCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
