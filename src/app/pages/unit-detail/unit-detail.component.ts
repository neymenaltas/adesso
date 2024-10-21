import {Component, OnInit} from '@angular/core';
import {Observable, switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AppState} from "app/store/app.state";
import {unitActions} from "app/store/units/unit.action";
import {Store} from "@ngrx/store";
import {selectUnitDetail, selectUnitsLoading} from "app/store/units/unit.selector";
import {Unit} from "app/models/unit.interface";
import {LoadingStatus} from "app/models/loading-status.interface";

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrl: './unit-detail.component.scss'
})
export class UnitDetailComponent implements OnInit {

  unitDetail$: Observable<Unit> = this.store.select(selectUnitDetail);
  public loadingStatus$: Observable<LoadingStatus> = this.store.select(selectUnitsLoading);

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(unitActions.loadUnitDetail({ id }));
    }
  }
}
