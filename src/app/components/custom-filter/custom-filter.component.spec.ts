import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { CustomFilterComponent } from './custom-filter.component';
import { filterActions } from 'app/store/filter/filter.action';
import { AppState } from 'app/store/app.state';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSliderModule} from "@angular/material/slider";
import {MatButtonModule} from "@angular/material/button"; // Import your AppState

describe('CustomFilterComponent', () => {
  let component: CustomFilterComponent;
  let fixture: ComponentFixture<CustomFilterComponent>;
  let store: jasmine.SpyObj<Store<AppState>>; // Use the AppState type here

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj<Store<AppState>>('Store', ['dispatch', 'select']);

    await TestBed.configureTestingModule({
      imports: [MatCheckboxModule, MatSliderModule, MatButtonModule], // Add HttpClientTestingModule here
      declarations: [CustomFilterComponent],
      providers: [
        { provide: Store, useValue: storeSpy }
      ]
    }).compileComponents();

    store = TestBed.inject(Store) as jasmine.SpyObj<Store<AppState>>; // Cast the injected store
    fixture = TestBed.createComponent(CustomFilterComponent);
    component = fixture.componentInstance;
    component.item = { type: 'gold', checked: false, range: 10 }; // Mock input
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize rangeValue correctly', () => {
    expect(component.rangeValue).toBe(10);
  });

  it('should dispatch changeChecked action when onCheckboxChange is called', () => {
    component.onCheckboxChange();
    expect(store.dispatch).toHaveBeenCalledWith(filterActions.changeChecked({ filterType: component.item.type }));
  });

  it('should dispatch changeRange action with the correct value after debounce', (done) => {
    const newValue = 20;

    const mockEvent = {
      target: { value: newValue },
    } as unknown as Event;

    component.onSliderChange(mockEvent);

    setTimeout(() => {
      expect(store.dispatch).toHaveBeenCalledWith(filterActions.changeRange({ filterType: component.item.type, number: newValue }));
      done();
    }, 600);
  });

  it('should set rangeValue correctly when onSliderChange is called', () => {
    const newValue = 30;

    const mockEvent = {
      target: { value: newValue },
    } as unknown as Event; // Cast to unknown first, then to Event

    component.onSliderChange(mockEvent);
    expect(component.rangeValue).toBe(newValue);
  });

  it('should debounce the changeRange dispatch', (done) => {
    const newValue1 = 15;
    const newValue2 = 25;

    const mockEvent1 = {
      target: { value: newValue1 },
    } as unknown as Event;

    const mockEvent2 = {
      target: { value: newValue2 },
    } as unknown as Event;

    component.onSliderChange(mockEvent1);
    component.onSliderChange(mockEvent2);

    setTimeout(() => {
      expect(store.dispatch).toHaveBeenCalledWith(filterActions.changeRange({ filterType: component.item.type, number: newValue2 }));
      expect(store.dispatch).toHaveBeenCalledTimes(1); // Ensure only the last value is dispatched
      done();
    }, 600); // Wait for debounce time
  });
});
