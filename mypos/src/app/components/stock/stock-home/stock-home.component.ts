import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NetworkService } from 'src/app/services/network.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.css']
})
export class StockHomeComponent implements OnInit {

  mDataArray : Product[]

  constructor(private networkService: NetworkService) { }

  ngOnInit() {
    this.feedData();
  }
  feedData() {
    this.networkService.getAllProduct().subscribe(
      data => {
        // alert(JSON.stringify(data))
      },
      error => {
        // alert(JSON.stringify(error))
      }
    );

    // var data = await this.networkService.getAllProduct().toPromise()
    // var data = await this.networkService.getAllProduct().toPromise()
    // var data = await this.networkService.getAllProduct().toPromise()
    // var data = await this.networkService.getAllProduct().toPromise()
  }

  getOutofStock() {
    return 100
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
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

}
