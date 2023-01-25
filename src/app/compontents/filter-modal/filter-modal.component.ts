import { Component, EventEmitter, Input, OnInit, Output,  } from '@angular/core';
import { SuppliersService } from 'src/app/service/suppliers.service';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.css'],
})
export class FilterModalComponent implements OnInit {
  @Output() filterEvent: EventEmitter<string> = new EventEmitter();
  @Output() toggleModal: EventEmitter<boolean> = new EventEmitter();
  @Input() modal: boolean = false;

  public status_options = [
    { name: 'Active', isSelected: false },
    { name: 'Pending Aproval', isSelected: false },
    { name: 'Waiting Compensation', isSelected: false },
  ];

  public filter: any = {
    status: '',
    phase: '',
    month: '',
  };

  constructor(
    private _suppliersService:SuppliersService,
    ) {

  }

  ngOnInit(): void {
    this._suppliersService.filter$.subscribe(val => {
      this.filter = val;
      this.status_options.map((el)=> {
        if(el.name === val.status){
          el.isSelected = true;
        }else{
          el.isSelected = false;
        }
      })
    })
  }

  onCheck(event: any) {
    if (event.target.checked === true) {
      let elements = document.getElementsByClassName('status-check');
      for (let i = 0; i < elements.length; i++) {
        let element = elements[i] as HTMLInputElement;
        element.checked = false;
      }
      let element = document.getElementById(
        event.target.id
      ) as HTMLInputElement;
      element.checked = true;
      this.filter.status = event.target.value;
    } else {
      this.filter.status = '';
    }
  }

  onCancel(){
    this.toggleModal.emit(false);
    this.filterEvent.emit(this.filter);
  }
  
  onApply() {
    this.filterEvent.emit(this.filter);
    this.toggleModal.emit(false);
    this.status_options.map((el) => {
      if(el.name !== this.filter.status){
        el.isSelected = false
      }
    })
    
  }
}
