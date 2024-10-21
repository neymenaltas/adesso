import {Ages} from "app/enums/ages.enum";

export interface FilterState {
  checked: {
    wood: boolean,
    food: boolean,
    gold: boolean,
  },
  range: {
    wood: number,
    food: number,
    gold: number,
  },
  age: string;
}

export const initialFilterState: FilterState = {
  checked: {
    wood: false,
    food: false,
    gold: false,
  },
  range: {
    wood: 0,
    food: 0,
    gold: 0,
  },
  age: Ages.All
};
