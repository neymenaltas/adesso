import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnitsComponent } from './units.component';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { unitActions } from 'app/store/units/unit.action';
import { filterActions } from 'app/store/filter/filter.action';
import { selectAllUnits, selectUnitsLoading } from 'app/store/units/unit.selector';
import { selectAge, selectChecked, selectRange } from 'app/store/filter/filter.selector';
import { Ages } from 'app/enums/ages.enum';
import { Unit } from 'app/models/unit.interface';
import { LoadingStatus } from 'app/models/loading-status.interface';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {CustomFilterComponent} from "app/components/custom-filter/custom-filter.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSliderModule} from "@angular/material/slider";
import {MatButtonModule} from "@angular/material/button";

describe('UnitsComponent', () => {
  let component: UnitsComponent;
  let fixture: ComponentFixture<UnitsComponent>;
  let store: MockStore;
  let router: Router;

  const initialState = {
    units: {
      loadingStatus: { loading: false, loaded: true } as LoadingStatus,
      unitDetail: [] as Unit[],
    },
    filter: {
      checked: {},
      range: {},
      age: Ages.All
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatCheckboxModule, MatSliderModule, MatButtonModule],
      declarations: [UnitsComponent, CustomFilterComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsComponent);
    component = fixture.componentInstance;

    // Mock selectors
    store.overrideSelector(selectAllUnits, [
      { id: 1, name: 'Unit 1', age: Ages.Dark, cost: { Wood: 100, Food: 50, Gold: 30 } },
      { id: 2, name: 'Unit 2', age: Ages.Feudal, cost: { Wood: 150, Food: 80, Gold: 20 } },
      { id: 3, name: 'Unit 3', age: Ages.Castle, cost: { Wood: 200, Food: 100, Gold: 60 } },
    ] as Unit[]);

    store.overrideSelector(selectUnitsLoading, { loading: false, loaded: true, loadFailed: false });
    store.overrideSelector(selectChecked, { wood: false, food: false, gold: false });
    store.overrideSelector(selectRange, { wood: 0, food: 0, gold: 0 });
    store.overrideSelector(selectAge, Ages.All);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadUnits action on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(unitActions.loadUnits());
  });

  it('should set selectedAge when filterAge$ emits', () => {
    const age = Ages.Feudal;
    store.overrideSelector(selectAge, age);
    component.ngOnInit(); // Trigger ngOnInit

    expect(component.selectedAge).toBe(age);
  });

  it('should navigate to unit detail page on goToUnitDetail', () => {
    const unitId = 1;
    component.goToUnitDetail(unitId);
    expect(router.navigate).toHaveBeenCalledWith(['/units', unitId]);
  });

  it('should dispatch changeAge action on age button click', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const age = Ages.Castle;
    component.onAgeButtonClick(age);
    expect(dispatchSpy).toHaveBeenCalledWith(filterActions.changeAge({ age }));
  });

  it('should filter units based on selected age', () => {
    store.overrideSelector(selectAge, Ages.Castle);
    const filteredUnits = component.filteredUnits$;

    filteredUnits.subscribe((units) => {
      expect(units.length).toBe(1);
      expect(units).toEqual([
        { id: 3, name: 'Unit 3', age: Ages.Castle, cost: Object({ Wood: 200, Food: 100, Gold: 60 }) }
      ] as Unit[]);
    });


  });

  it('should unsubscribe from all subscriptions on destroy', () => {
    const unsubscribeSpy = spyOn(component.subscriptions$, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
