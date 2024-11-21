import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardgameCardComponent } from './boardgame-card.component';
import { BoardGame } from '../boardgame.model';

describe('BoardgameCardComponent', () => {
  let component: BoardgameCardComponent;
  let fixture: ComponentFixture<BoardgameCardComponent>;
  let boardgame: BoardGame;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [BoardgameCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardgameCardComponent);
    component = fixture.componentInstance;

    // Mock a BoardGame object
    boardgame = {
      gameId: 123,
      name: 'Test Game',
      thumbnail: 'http://example.com/test-game-thumbnail.jpg',
      rank: 1,
      yearPublished: 2023,
    };

    component.boardgame = input(boardgame);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the boardgame name', () => {
    const compiled = fixture.nativeElement;
    const nameElement = compiled.querySelector('.card-title a');
    expect(nameElement.textContent).toContain(boardgame.name);
  });

  it('should display the boardgame rank', () => {
    const compiled = fixture.nativeElement;
    const rankElement = compiled.querySelector('p:nth-child(2)');
    expect(rankElement.textContent).toContain(`Rank: ${boardgame.rank}`);
  });

  it('should display the boardgame year published', () => {
    const compiled = fixture.nativeElement;
    const yearPublishedElement = compiled.querySelector('p:nth-child(3)');
    expect(yearPublishedElement.textContent).toContain(`Year published: ${boardgame.yearPublished}`);
  });

  it('should have a thumbnail image with the correct source', () => {
    const compiled = fixture.nativeElement;
    const imgElement = compiled.querySelector('img');
    expect(imgElement.getAttribute('src')).toBe(boardgame.thumbnail);
  });

  it('should have a router link on the image', () => {
    const compiled = fixture.nativeElement;
    const imgElement = compiled.querySelector('img');
    expect(imgElement.getAttribute('ng-reflect-router-link')).toBe(`/boardgame/${boardgame.gameId}`);
  });

  it('should have a router link on the boardgame name', () => {
    const compiled = fixture.nativeElement;
    const nameElement = compiled.querySelector('.card-title a');
    expect(nameElement.getAttribute('ng-reflect-router-link')).toBe(`/boardgame/${boardgame.gameId}`);
  });
});