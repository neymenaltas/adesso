import {Component, Input, OnInit} from '@angular/core';
import {AppState} from "app/store/app.state";
import {Store} from "@ngrx/store";
import {filterActions} from "app/store/filter/filter.action";
import {FilterState} from "app/store/filter/filter.state";
import {debounceTime, Subject} from "rxjs";

@Component({
  selector: 'app-custom-filter',
  templateUrl: './custom-filter.component.html',
  styleUrl: './custom-filter.component.scss'
})
export class CustomFilterComponent implements OnInit{
  @Input() item!: { type: keyof FilterState['checked']; checked: boolean; range: number };

  private rangeChangeSubject = new Subject<number>();
  public rangeValue = 0;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.rangeValue = this.item.range;
    this.rangeChangeSubject.pipe(
      debounceTime(500),
    ).subscribe(value => {
      this.store.dispatch(filterActions.changeRange({ filterType: this.item.type, number: value }));
    });
  }

  onCheckboxChange() {
    this.store.dispatch(filterActions.changeChecked({ filterType: this.item.type }));
  }

  onSliderChange(event: Event) {
    const target = event.target as HTMLInputElement
    this.rangeValue = +target.value;
    this.rangeChangeSubject.next(+target.value);
  }

}
