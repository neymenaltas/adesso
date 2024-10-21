import { createAction, props } from '@ngrx/store';
import {FilterState} from "app/store/filter/filter.state";

const FilterActionTypes = {
  ChangeChecked: '[Filter] Change Checked',
  ChangeRange: '[Filter] Change Range',
  ChangeAge: '[Filter] Change Age'
};

const changeChecked = createAction(
  FilterActionTypes.ChangeChecked,
  props<{ filterType: keyof FilterState['checked'] }>()
);

const changeRange = createAction(
  FilterActionTypes.ChangeRange,
  props<{ filterType: string, number: number }>()
);

const changeAge = createAction(
  FilterActionTypes.ChangeAge,
  props<{age: string}>()
);

export const filterActions = {
  changeChecked,
  changeRange,
  changeAge
}
