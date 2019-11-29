import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { NetworkService } from 'src/app/services/network.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent implements OnInit {

  mProduct = new Product();
  imageSrc: String | ArrayBuffer = null

  constructor(private location: Location, private networkService: NetworkService) { }

  ngOnInit() {
    this.mProduct.stock = 0;
    this.mProduct.price = 0;
  }

  submit() {
    this.networkService.newProduct(this.mProduct).subscribe(
      data => {
        this.location.back();
      }
    );
    // alert(JSON.stringify(this.mProduct))
  }

  cancel() {
    this.location.back();
  }

  onUploadImage(event) {
    const metaImage = event.target.files[0];
    if (metaImage) {
      const reader = new FileReader();
      reader.readAsDataURL(metaImage);
      reader.onload = () => {
        this.imageSrc = reader.result;
        this.mProduct.image = metaImage;
      };
    }
  }

}
