import {Unit} from "app/models/unit.interface";

export interface UnitState {
  units: Unit[];
  unitDetail: Unit;
  loading: boolean;
  loaded: boolean;
  loadFailed: boolean;
}

export const initialUnitState: UnitState = {
  units: [],
  unitDetail: {
    id: 0,
    name: '',
    description: '',
    age: '',
    cost: {
      Wood: 0,
      Food: 0,
      Gold: 0
    },
    build_time: 0,
    reload_time: 0,
    hit_points: 0,
    attack: 0,
    accuracy: 0
  },
  loading: false,
  loaded: false,
  loadFailed: false,
};
