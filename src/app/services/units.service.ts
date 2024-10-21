import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Unit} from "app/models/unit.interface";

@Injectable({
  providedIn: 'root'
})
export class UnitsService {
  private apiUrl = '/api/units'; // API endpoint

  constructor(private http: HttpClient) {}

  getUnits(): Observable<Unit[]> {
    return this.http.get<Unit[]>(this.apiUrl);
  }

  getUnitDetail(id: string): Observable<Unit> {
    return this.http.get<Unit>(`${this.apiUrl}/${id}`);
  }
}
