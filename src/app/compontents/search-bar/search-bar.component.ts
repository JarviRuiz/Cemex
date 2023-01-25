import { Component, OnInit , Output, EventEmitter} from '@angular/core';

import { SuppliersService } from 'src/app/service/suppliers.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  @Output() searchEvent: EventEmitter<string> = new EventEmitter();
  @Output() toggleModal: EventEmitter<boolean> = new EventEmitter();
  @Output() filterEvent: EventEmitter<string> = new EventEmitter();

 public search:string = '';
 public name: string = '';

 public filter:any = {
  status: '',
  phase:'',
  month: '',
 }



  constructor(
    private _suppliersService:SuppliersService,
  ) {}

  ngOnInit(): void {
    this._suppliersService.filter$.subscribe(val => {
      this.filter = val;
    })
  }

  onClean(){
      this.filter.status = '';
      this.filter.phase = '';
      this.filter.month = '';
      this.filterEvent.emit(this.filter);
      this.searchEvent.emit(this.search);
  }

  onRemove(filter:string){
      if(filter === 'status'){
        this.filter.status = '';
      }else if(filter ==='phase'){
        this.filter.phase = '';
      }else if(filter === 'month'){

        this.filter.month = '';
      }
      this.filterEvent.emit(this.filter);
      this.searchEvent.emit(this.search);
    }

  onSearch() {
    this.searchEvent.emit(this.search);
  }

  onToggleModal() {
    this.toggleModal.emit(true);
  }
}
