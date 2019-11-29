import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { Product } from 'src/app/models/product.model';
import { NetworkService } from 'src/app/services/network.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.css']
})

export class StockHomeComponent implements OnInit {

  mDataArray: Product[]
  mSearchProductArray: Product[]

  searchTextChanged = new Subject<string>();

  constructor(private networkService: NetworkService) { }

  ngOnInit() {
    this.feedData();

    this.searchTextChanged.pipe(
      debounceTime(1000)
    ).subscribe(term => this.onSearch(term));
  }

  onSearch(keyword: string) {
    if (keyword === '') {
      this.feedData();
    } else {
      this.mDataArray = this.mSearchProductArray.filter((product) => {
        return product.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1
      });
    }
  }

  feedData() {
    this.networkService.getAllProduct().subscribe(
      data => {
        console.log(data.result);
        this.mDataArray = data.result.map(product => {
          product.image = this.networkService.productImageURL + "/" + product.image;
          return product
        });

        this.mSearchProductArray = this.mDataArray;
      },
      error => {
        alert(JSON.stringify(error))
      }
    );
  }

  getOutofStock(): number {
    return this.mDataArray.filter(product => {
      if (product.stock <= 0) {
        return product
      }
    }).length
  }

  editProduct(id: number) {
  }

  deleteProduct(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.networkService.deleteProduct(id).subscribe(
          data => {
            Swal.fire(
              'Deleted!',
              data.message,
              'success'
            )

            this.feedData()
          },
          error => {
            alert(JSON.stringify(error))
          }
        );
      }
    })
  }
}
