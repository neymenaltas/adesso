import { Action, ActionReducer } from '@ngrx/store';
import { unitReducer } from 'app/store/units/unit.reducer';
import { filterReducer } from 'app/store/filter/filter.reducer';
import { FilterState } from 'app/store/filter/filter.state';
import { UnitState } from 'app/store/units/unit.state';

export const appReducer: { units: ActionReducer<UnitState, Action>; filter: ActionReducer<FilterState, Action> } = {
  units: unitReducer,
  filter: filterReducer,
};
