import { createReducer, on } from '@ngrx/store';
import { unitActions } from './unit.action';
import {initialUnitState} from "app/store/units/unit.state";

export const unitReducer = createReducer(
  initialUnitState,
  on(unitActions.loadUnits, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      loadFailed: false,
    }
  }),
  on(unitActions.loadUnitSuccess, (state, { units }) => ({
    ...state,
    units: units,
    loading: false,
    loaded: true,
    loadFailed: false
  })),
  on(unitActions.loadUnitFail, (state) => ({
    ...state,
    loading: false,
    loaded: false,
    loadFailed: true
  })),
  on(unitActions.loadUnitDetail, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      loadFailed: false,
    }
  }),
  on(unitActions.loadUnitDetailSuccess, (state, { unit }) => ({
    ...state,
    unitDetail: unit,
    loading: false,
    loaded: true,
    loadFailed: false
  })),
  on(unitActions.loadUnitDetailFail, (state) => ({
    ...state,
    loading: false,
    loaded: false,
    loadFailed: true
  }))
);
