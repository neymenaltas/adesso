import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnitDetailComponent } from './unit-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { unitActions } from 'app/store/units/unit.action';
import { selectUnitDetail, selectUnitsLoading } from 'app/store/units/unit.selector';
import { Unit } from 'app/models/unit.interface';
import { LoadingStatus } from 'app/models/loading-status.interface';

describe('UnitDetailComponent', () => {
  let component: UnitDetailComponent;
  let fixture: ComponentFixture<UnitDetailComponent>;
  let store: MockStore;
  let router: Router;

  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: () => '1'
      }
    }
  };

  const initialState = {
    units: {
      loadingStatus: { loading: false, loaded: true },
      unitDetail: { id: 1, name: 'Unit 1' } as Unit,
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        provideMockStore({ initialState }),
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadUnitDetail action on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const id = '1';

    component.ngOnInit();

    expect(dispatchSpy).toHaveBeenCalledWith(unitActions.loadUnitDetail({ id }));
  });

  it('should select unitDetail from the store', () => {
    const mockUnitDetail: Unit = {
      id: 1,
      name: 'Unit 1',
      description: '',
      age: '',
      cost: {
        Wood: 0,
        Food: 0,
        Gold: 0
      },
      build_time: 0,
      reload_time: 0,
      hit_points: 0,
      attack: 0,
      accuracy: 0
    };
    store.overrideSelector(selectUnitDetail, mockUnitDetail);

    component.unitDetail$.subscribe((unit) => {
      expect(unit).toEqual(mockUnitDetail);
    });
  });

  it('should select loadingStatus from the store', () => {
    const mockLoadingStatus: LoadingStatus = { loading: false, loaded: true, loadFailed: false };
    store.overrideSelector(selectUnitsLoading, mockLoadingStatus);

    component.loadingStatus$.subscribe((status) => {
      expect(status).toEqual(mockLoadingStatus);
    });
  });

  it('should navigate to units list on goBack', () => {
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/units']);
  });

  it('should unsubscribe from all subscriptions on destroy', () => {
    const unsubscribeSpy = spyOn(component.subscriptions$, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
