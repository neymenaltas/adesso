import { Routes } from '@angular/router';
import {UnitsComponent} from "app/pages/units/units.component";
import {UnitDetailComponent} from "app/pages/unit-detail/unit-detail.component";
import {HomeComponent} from "app/pages/home/home.component";
import {ErrorComponent} from "app/pages/error/error.component";

export const routes: Routes = [
  { path: 'units', component: UnitsComponent },
  { path: 'home', component: HomeComponent },
  { path: '404', component: ErrorComponent },
  { path: 'units/:id', component: UnitDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404' } // Bilinmeyen rotalar için yönlendirme

];
