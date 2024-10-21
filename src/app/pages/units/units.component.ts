import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UnitsService} from "app/services/units.service";
import {Store} from "@ngrx/store";
import {AppState} from "app/store/app.state";
import {unitActions} from "app/store/units/unit.action";
import {combineLatest, Observable, Subscription} from "rxjs";
import {selectAllUnits, selectUnitsLoading} from "app/store/units/unit.selector";
import {selectAge, selectChecked, selectRange} from "app/store/filter/filter.selector";
import {map} from "rxjs/operators";
import {FilterState} from "app/store/filter/filter.state";
import {Ages} from "app/enums/ages.enum";
import {filterActions} from "app/store/filter/filter.action";
import {Unit} from "app/models/unit.interface";
import {LoadingStatus} from "app/models/loading-status.interface";
import {Filter, ManipulatedFilter} from "app/models/filter.interface";

@Component({
  selector: 'app-units', templateUrl: './units.component.html',
  styleUrl: './units.component.scss'
})
export class UnitsComponent implements OnInit, OnDestroy {

  public units$: Observable<Unit[]> = this.store.select(selectAllUnits);
  public filters$: Observable<Filter[]> = combineLatest([
    this.store.select(selectChecked),
    this.store.select(selectRange)
  ]).pipe(
    map(([checked, range]: [FilterState['checked'], FilterState['range']]) => {
      const merged: Filter[] = (Object.keys(checked) as (keyof FilterState['checked'])[]).map(key => {
        return {
          type: key,
          checked: checked[key],
          range: range[key]
        };
      });
      return merged;
    })
  );

  public manipulatedFilters$: Observable<ManipulatedFilter[]> = this.filters$.pipe(
    map((filters: Filter[]) => {
      return filters
        .filter((filter) => filter.checked)
        .map((_filter) => ({
          [_filter.type]: _filter.range
        })) as ManipulatedFilter[];
    })
  );

  public filterAge$: Observable<string> = this.store.select(selectAge);


  public filteredUnits$: Observable<Unit[]> = combineLatest([
    this.manipulatedFilters$,
    this.filterAge$,
    this.units$
  ]).pipe(
    map(([manipulatedFilters, selectedAge, units]) => {
      return units.filter((unit: Unit) => {
        if(selectedAge === Ages.Feudal) {
          if(unit.age === Ages.Dark) {
            return false;
          }
        } else if (selectedAge === Ages.Castle) {
          if(unit.age === Ages.Dark || unit.age === Ages.Feudal) {
            return false;
          }
        } else if (selectedAge === Ages.Imperial) {
          if(unit.age === Ages.Dark || unit.age === Ages.Feudal || unit.age === Ages.Castle) {
            return false;
          }
        }
        let normalizedCosts: Record<string, number> = {
          ...unit.cost,
          Wood: unit.cost?.Wood || 0,
          Food: unit.cost?.Food || 0,
          Gold: unit.cost?.Gold || 0
        };

        normalizedCosts = Object.fromEntries(
          Object.entries(normalizedCosts).map(([key, value]) => [
            key.charAt(0).toLowerCase() + key.substring(1), // İlk harfi küçült
            value
          ])
        );

        if (manipulatedFilters.length) {
          const filterPasses = manipulatedFilters.every((manipulatedFilter: ManipulatedFilter) => {
            const filterKey = Object.keys(manipulatedFilter)[0];
            const filterValue = Object.values(manipulatedFilter)[0];
            return normalizedCosts[filterKey] >= (filterValue as number);
          });
          if (!filterPasses) return false;
        }

        return true;
      });
    })
  );

  ages = [
    { key: 'All', value: Ages.All },
    { key: 'Dark', value: Ages.Dark },
    { key: 'Feudal', value: Ages.Feudal },
    { key: 'Castle', value: Ages.Castle },
    { key: 'Imperial', value: Ages.Imperial }
  ];

  selectedAge: string = Ages.All;

  public loadingStatus$: Observable<LoadingStatus> = this.store.select(selectUnitsLoading);

  public filterAgeSubscription$!: Subscription;

  constructor(private router: Router, private unitsService: UnitsService, private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(unitActions.loadUnits());
    this.filterAgeSubscription$ = this.filterAge$.subscribe(age => {
      this.selectedAge = age;
    });
  }

  goToUnitDetail(unitId: number) {
    this.router.navigate(['/units', unitId]);
  }

  onAgeButtonClick(age: string) {
    this.store.dispatch(filterActions.changeAge({age: age}))
  }

  ngOnDestroy() {
    if (this.filterAgeSubscription$) {
      this.filterAgeSubscription$.unsubscribe();
    }
  }
}
