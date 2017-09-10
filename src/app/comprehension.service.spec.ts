import { TestBed, inject } from '@angular/core/testing';

import { ComprehensionService } from './comprehension.service';

describe('ComprehensionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComprehensionService]
    });
  });

  it('should be created', inject([ComprehensionService], (service: ComprehensionService) => {
    expect(service).toBeTruthy();
  }));
});
