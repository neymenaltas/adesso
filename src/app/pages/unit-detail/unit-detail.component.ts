import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
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
export class UnitDetailComponent implements OnInit, OnDestroy {

  unitDetail$: Observable<Unit> = this.store.select(selectUnitDetail);
  unitDetail!: Unit;
  loadingStatus$: Observable<LoadingStatus> = this.store.select(selectUnitsLoading);
  loadingStatus: LoadingStatus = {loading: false, loaded: false, loadFailed: false};

  subscriptions$: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(unitActions.loadUnitDetail({ id }));
    }
    this.subscriptions$.add(
      this.loadingStatus$.subscribe(loadingStatus => {this.loadingStatus = loadingStatus;})
    )
    this.subscriptions$.add(
      this.unitDetail$.subscribe(unitDetail => {this.unitDetail = unitDetail})
    )
  }

  goBack() {
    this.router.navigate(['/units']);
  }

  ngOnDestroy() {
    if(this.subscriptions$) {
      this.subscriptions$.unsubscribe();
    }
  }

}
