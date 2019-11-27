import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Location } from '@angular/common'
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  position:String[] = ['Cashier', 'Admin'];

  // DI
  constructor(private location: Location, private networkService: NetworkService) { }

  ngOnInit() {
  }

  register(form: NgForm) {
    // alert(JSON.stringify(form.value))
    this.networkService.register(form.value).subscribe(
      data => {
        this.location.back()
      },
      error => {
        
      }
    );
  }

  checkConfirmPassword(form: NgForm) {
    return  form.value.password !== form.value.confirm_password && form.value.confirm_password !== ''
  }

  cancel(){
    this.location.back()
  }

}
