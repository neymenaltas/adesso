export type FilterType = "wood" | "food" | "gold";

export interface Filter {
  type: FilterType;
  checked: boolean;
  range: number;
}

export type ManipulatedFilter = Record<FilterType, number>;
