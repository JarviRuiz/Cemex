    import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { suppliers } from './mock';

import { Filter } from '../interfaces/Supplier'

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  private filterSubject = new BehaviorSubject<Filter>({
      month: '',
      status: '',
      phase: '',
  });
  filter$ = this.filterSubject.asObservable();


  constructor() { }

  getSuppliers(  status:string , month:string , phase:string ){
    let array = suppliers;

    const r_status = new RegExp(status, 'i');
    array = array.filter((el) => r_status.test(el.status));

    const r_month = new RegExp(month, 'i');
    array = array.filter((el) => r_month.test(el.month));
    

    const r_phase = new RegExp(phase, 'i');
    array = array.filter((el) => r_phase.test(el.phase));
    
    this.filterSubject.next({
        status:status,
        month:month,
        phase:phase,
    });

    array.sort((a, b) => a.status.localeCompare(b.status))

    return array
  }
}