import { createFeatureSelector, createSelector } from '@ngrx/store';
import {UnitState} from "app/store/units/unit.state";

export const selectUnitsState = createFeatureSelector<UnitState>('units');

export const selectAllUnits = createSelector(
  selectUnitsState,
  (state: UnitState) => state.units
);

export const selectUnitsLoading = createSelector(
  selectUnitsState,
  (state: UnitState) => ({
    loading: state.loading,
    loaded: state.loaded,
    loadFailed: state.loadFailed
  })
);

export const selectUnitDetail = createSelector(
  selectUnitsState,
  (state: UnitState) => state.unitDetail
);
