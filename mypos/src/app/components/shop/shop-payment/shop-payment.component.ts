import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-shop-payment',
  templateUrl: './shop-payment.component.html',
  styleUrls: ['./shop-payment.component.css']
})
export class ShopPaymentComponent {

  // total nickname of totalPayment
  @Input("total") totalPayment: number
  // Output Type Event
  @Output("submit_success") submitPayment = new EventEmitter<void>()

  @Input("order") orderPayment: string
  @Output("test_success") testPayment = new EventEmitter<String>()
  @Output("sendName") sendName = new EventEmitter<String>()

  givenNumber = '0.00';

  constructor(private NetworkService: NetworkService) { }

  // Variable not Function
  public get mChange(): number {
    const cash = Number(this.givenNumber.replace(/,/g, ''));
    const result = cash - this.totalPayment;
    if (result >= 0) {
      return result;
    } else {
      return 0;
    }
  }

  public get isPaidEnough() {
    var given = Number(this.givenNumber);
    if (given > 0 && given >= this.totalPayment) {
      return true;
    }
    return false;
  }

  onClickExact() {
    this.givenNumber = String(this.totalPayment);
  }

  onClickGiven(addGiven: number) {
    this.givenNumber = String(Number(this.givenNumber) + addGiven + '.00');
  }

  onClickReset() {
    this.givenNumber = '0.00';
  }

  onClickSubmit() {
    this.submitPayment.emit();
    this.sendName.emit("natthasath");
  }

}
