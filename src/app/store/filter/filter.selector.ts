import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FilterState } from 'app/store/filter/filter.state';

export const selectFilterState = createFeatureSelector<FilterState>('filter');

export const selectChecked = createSelector(
  selectFilterState,
  (state: FilterState) => state.checked
);

export const selectRange = createSelector(
  selectFilterState,
  (state: FilterState) => state.range
);

export const selectAge = createSelector(
  selectFilterState,
  (state: FilterState) => state.age
);
