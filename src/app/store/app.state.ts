import {initialUnitState, UnitState} from './units/unit.state';
import {FilterState, initialFilterState} from "app/store/filter/filter.state";

export interface AppState {
  initialUnitState: UnitState,
  initialFilterState: FilterState,
}

export const initialAppState: AppState = {
  initialUnitState,
  initialFilterState,
};
