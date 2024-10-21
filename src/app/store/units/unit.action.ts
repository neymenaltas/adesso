import { createAction, props } from '@ngrx/store';
import {Unit} from "app/models/unit.interface";

const UnitsActionTypes = {
  LoadUnits: '[Units] Load Units',
  LoadUnitSuccess: '[Units] Load Units Success',
  LoadUnitFail: '[Units] Load Units Fail',
  LoadUnitDetail: '[Units] Load Unit Detail',
  LoadUnitDetailSuccess: '[Units] Load Unit Detail Success',
  LoadUnitDetailFail: '[Units] Load Unit Detail Fail'
};

const loadUnits = createAction(
  UnitsActionTypes.LoadUnits
);

const loadUnitSuccess = createAction(
  UnitsActionTypes.LoadUnitSuccess,
  props<{ units: Unit[] }>()
);

const loadUnitFail = createAction(
  UnitsActionTypes.LoadUnitFail,
  props<{ error: string }>()
);

const loadUnitDetail = createAction(
  UnitsActionTypes.LoadUnitDetail,
  props<{ id: string }>()
);

const loadUnitDetailSuccess = createAction(
  UnitsActionTypes.LoadUnitDetailSuccess,
  props<{ unit: Unit }>()
);

const loadUnitDetailFail = createAction(
  UnitsActionTypes.LoadUnitDetailFail,
  props<{ error: string }>()
);

export const unitActions = {
  loadUnits,
  loadUnitSuccess,
  loadUnitFail,
  loadUnitDetail,
  loadUnitDetailSuccess,
  loadUnitDetailFail
}
