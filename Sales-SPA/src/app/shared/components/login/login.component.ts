import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { first } from 'rxjs/operators';
import { UserResource } from '../../models/user-resource';
import { Role } from '../../models/Role';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  private formSubmitAttempt: boolean;
  userData: UserResource;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value.userName, this.form.value.password)
        .pipe(first())
          .subscribe(data => {
            this.userData = data;
            if (this.userData.RoleName === Role.Admin) {
              this.router.navigate(['/admin']);
            } else if (this.userData.RoleName === Role.User) {
              this.router.navigate(['/']);
            }
          }, error => {
            console.log('Login Failed');
          });
    }
    this.formSubmitAttempt = true;
  }

}
