import { createReducer, on } from '@ngrx/store';
import { filterActions } from './filter.action';
import {FilterState, initialFilterState} from "app/store/filter/filter.state";

export const filterReducer = createReducer(
  initialFilterState,
  on(filterActions.changeChecked, (state, { filterType }: { filterType: keyof FilterState['checked'] }) => {
    return {
      ...state,
      checked: {
        ...state.checked,
        [filterType]: !state.checked[filterType]
      }
    };
  }),
  on(filterActions.changeRange, (state, { filterType, number }) => {
    return {
      ...state,
      range: {
        ...state.range,
        [filterType]: number,
      }
    }
  }),
  on(filterActions.changeAge, (state, { age }) => ({
    ...state,
    age: age,
  }))
);
