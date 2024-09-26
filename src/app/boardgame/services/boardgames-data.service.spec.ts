import { TestBed } from '@angular/core/testing';

import { BoardgamesDataService } from './boardgames-data.service';

describe('BoardgamesDataService', () => {
  let service: BoardgamesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardgamesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
