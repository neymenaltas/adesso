import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UnitsService } from 'app/services/units.service';
import {unitActions} from "app/store/units/unit.action";

@Injectable()
export class UnitEffects {
  constructor(
    private actions$: Actions,
    private unitsService: UnitsService
  ) {}

  loadUnits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unitActions.loadUnits),
      mergeMap(() =>
        this.unitsService.getUnits().pipe(
          map((units) => unitActions.loadUnitSuccess({ units })),
          catchError((error) => of(unitActions.loadUnitFail({ error })))
        )
      )
    )
  );

  loadUnitDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unitActions.loadUnitDetail),
      mergeMap((action) =>
        this.unitsService.getUnitDetail(action.id).pipe(
          map((unit) => unitActions.loadUnitDetailSuccess({ unit })),
          catchError((error) => of(unitActions.loadUnitDetailFail({ error })))
        )
      )
    )
  );
}
