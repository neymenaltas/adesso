import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UnitsService } from './units.service';
import { Unit } from 'app/models/unit.interface';

describe('UnitsService', () => {
  let service: UnitsService;
  let httpMock: HttpTestingController;

  const mockUnits: Unit[] = [
    { id: 1, name: 'Unit 1', age: 'Feudal', cost: { Wood: 100, Food: 50, Gold: 30 } },
    { id: 2, name: 'Unit 2', age: 'Castle', cost: { Wood: 150, Food: 80, Gold: 20 } },
    { id: 3, name: 'Unit 3', age: 'Dark', cost: { Wood: 200, Food: 100, Gold: 60 } }
  ] as Unit[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UnitsService]
    });

    service = TestBed.inject(UnitsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get units from API', () => {
    service.getUnits().subscribe((units) => {
      expect(units.length).toBe(3);
      expect(units).toEqual(mockUnits);
    });

    const req = httpMock.expectOne('/api/units');
    expect(req.request.method).toBe('GET');
    req.flush(mockUnits);
  });

  it('should get unit detail from API', () => {
    const unitId = '1';
    const expectedUnit: Unit = mockUnits[0];

    service.getUnitDetail(unitId).subscribe((unit) => {
      expect(unit).toEqual(expectedUnit);
    });

    const req = httpMock.expectOne(`/api/units/${unitId}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedUnit);
  });
});
