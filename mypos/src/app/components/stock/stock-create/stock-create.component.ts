import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent implements OnInit {

  mProduct = new Product();

  constructor() { }

  ngOnInit() {
  }

  submit() {
    alert(JSON.stringify(this.mProduct))
  }

  cancel() {
    
  }

}
