import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardgamePageComponent } from './boardgame-page.component';

describe('BoardgamePageComponent', () => {
  let component: BoardgamePageComponent;
  let fixture: ComponentFixture<BoardgamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardgamePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardgamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
