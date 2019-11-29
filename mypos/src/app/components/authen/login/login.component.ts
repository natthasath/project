import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private networkService: NetworkService,
    private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isLogin()) {
      this.router.navigate(["/stock"])
    }
  }

  login(form: NgForm) {
    // alert(JSON.stringify(form.value))
    this.networkService.login(form.value).subscribe(
      data => {
        if (data.token != null) {
          localStorage.setItem(environment.keyLocalAuthenInfo, data.token)
          this.router.navigate(["/stock"]);
        } else {
          alert(data.message)
        }
      }
    )
  }

}
