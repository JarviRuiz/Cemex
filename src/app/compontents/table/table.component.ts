import { Component, OnInit } from '@angular/core';

import {Supplier } from '../../interfaces/Supplier'

import { SuppliersService } from 'src/app/service/suppliers.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  public mock:Supplier[] = [];
  public suppliers:Supplier[] = [];
  public total_amount:number = 0;
  public modal:boolean = false;

  constructor(
    private _suppliersService:SuppliersService,
  ) { }

  ngOnInit(): void {
   
   this.getSuppliers('','','')
  }

  getTotalAmount(){
     this.total_amount = this.suppliers.map((el) => el.amount).reduce((acc, a) => acc + a, 0)
     this.total_amount.toLocaleString("en-US")
  }

  getSuppliers( status:string, month:string, phase:string){
    this.mock = this._suppliersService.getSuppliers(status, month, phase )
    this.suppliers = this.mock;
    this.getTotalAmount();
  }

  onSearch(e:string){
    const val = new RegExp(e, 'i');
    this.suppliers = this.mock.filter((el) => val.test(el.name));
    this.suppliers.sort((a, b) => a.status.localeCompare(b.status))
    this.getTotalAmount()
  }
  
  onFilter(e:any){
    this.getSuppliers( e.status, e.month, e.phase)
  }

  toggleModal(e:boolean){
    this.modal = e;
  }
}
