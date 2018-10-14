import { TestBed, inject } from '@angular/core/testing';

import { EtudiantService } from './etudiant.service';

describe('EtudiantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EtudiantService]
    });
  });

  it('should be created', inject([EtudiantService], (service: EtudiantService) => {
    expect(service).toBeTruthy();
  }));
});
