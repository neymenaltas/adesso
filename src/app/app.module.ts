import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {UnitsComponent} from "app/pages/units/units.component";
import {CustomFilterComponent} from "app/components/custom-filter/custom-filter.component";
import {UnitDetailComponent} from "app/pages/unit-detail/unit-detail.component";
import {ErrorComponent} from "app/pages/error/error.component";
import {HomeComponent} from "app/pages/home/home.component";
import {TopNavBarComponent} from "app/components/top-nav-bar/top-nav-bar.component";
import {routes} from "app/app.routes";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FakeBackendInterceptor} from "app/utils/fake-backend.interceptor";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {StoreModule} from "@ngrx/store";
import {appReducer} from "app/store/app.reducer";
import {EffectsModule} from "@ngrx/effects";
import {UnitsService} from "app/services/units.service";
import {UnitEffects} from "app/store/units/unit.effects";
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    UnitsComponent,
    CustomFilterComponent,
    UnitsComponent,
    UnitDetailComponent,
    ErrorComponent,
    HomeComponent,
    TopNavBarComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatSliderModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    FormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([UnitEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptor,
      multi: true
    },
    UnitsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
